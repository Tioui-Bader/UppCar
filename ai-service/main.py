import base64
import io
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("Pillow non installé - mode minimal activé")
try:
    import numpy as np
    import easyocr
    import os
    import sys
    # Forcer l'encodage UTF-8 pour éviter les erreurs sur Windows
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass
    
    print("Tentative d'initialisation d'EasyOCR...")
    # Désactiver le GPU pour les tests initiaux
    reader = easyocr.Reader(['fr', 'en'], gpu=False) 
    OCR_AVAILABLE = True
    print("OK: EasyOCR initialise avec succes (CPU)")
except Exception as e:
    import traceback
    reader = None
    OCR_AVAILABLE = False
    err_str = f"ERREUR: OCR non disponible: {e}\n{traceback.format_exc()}"
    print(err_str)
    try:
        with open("ocr_error.log", "w") as f:
            f.write(err_str)
    except:
        pass

app = FastAPI(title="UppCar AI Identity Lite")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




class DocVerificationRequest(BaseModel):
    image: str
    doc_type: str  # "cin" or "permis"


class GlobalVerificationRequest(BaseModel):
    cin: str
    permis: str


def decode_base64_img(b64_str):
    """Decode base64 image. Returns PIL image or True if PIL not available."""
    try:
        if not b64_str:
            return None
        _, data = b64_str.split(',') if ',' in b64_str else (None, b64_str)
        img_bytes = base64.b64decode(data)
        if not PIL_AVAILABLE:
            # Just check it's a non-empty valid base64 blob
            return img_bytes if img_bytes else None
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        if OCR_AVAILABLE:
            import numpy as np
            return np.array(pil_img)
        return pil_img  # PIL image, not numpy
    except Exception as e:
        print(f"Decode error: {e}")
        return None


def extract_names(texts):
    excluded = [
        "ROYAUME", "MAROC", "CARTE", "NATIONALE", "IDENTITE",
        "PERMIS", "CONDUIRE", "CATEGORIE", "PHOTO", "VALIDE", "SIGNATURE"
    ]
    words = []
    for t in texts:
        if isinstance(t, str):
            t_up = t.upper().replace(':', '').strip()
            if re.match(r'^[A-Z\s\-]{3,20}$', t_up) and not any(e in t_up for e in excluded):
                if not any(char.isdigit() for char in t_up):
                    words.append(t_up)
    return " ".join(words[:4])


@app.post("/verify-doc")
async def verify_single_doc(req: DocVerificationRequest):
    img = decode_base64_img(req.image)
    if img is None:
        raise HTTPException(status_code=400, detail="Image invalide ou illisible")

    # Si OCR non disponible, on rejette le document
    if not OCR_AVAILABLE or reader is None:
        raise HTTPException(
            status_code=503,
            detail="Service OCR non disponible. Impossible de valider le document."
        )

    texts = reader.readtext(img, detail=0)
    full_text = " ".join(texts).upper()
    print(f"[OCR] Texte extrait: {full_text[:200]}")

    id_pattern = r'[A-Z]{1,2}\s?\d{4,8}'
    date_pattern = r'\d{2}[\s/.-]+\d{2}[\s/.-]+\d{4}'
    found_dates = re.findall(date_pattern, full_text)
    found_ids = re.findall(id_pattern, full_text)
    found_name = extract_names(texts)

    print(f"[OCR] IDs: {found_ids}, Dates: {found_dates}, Nom: {found_name}")

    if req.doc_type == "cin":
        is_valid = (
            any(k in full_text for k in ["NATIONALE", "IDENTITE", "MAROC", "NOM"])
            and (len(found_ids) > 0 or len(found_dates) > 0)
            and len(found_name) > 0
        )
    else:
        is_valid = (
            any(k in full_text for k in ["PERMIS", "CONDUIRE", "NOM"])
            and (len(found_ids) > 0 or any(char.isdigit() for char in full_text))
            and len(found_name) > 0
        )

    return {
        "is_valid": is_valid,
        "details": {
            "name": found_name,
            "id": found_ids[0] if found_ids else None,
            "birth_date": found_dates[0] if found_dates else None
        }
    }


@app.post("/verify")
async def verify_identity(req: GlobalVerificationRequest):
    img_cin = decode_base64_img(req.cin)
    img_permis = decode_base64_img(req.permis)

    if img_cin is None or img_permis is None:
        raise HTTPException(status_code=400, detail="Images manquantes ou corrompues")

    # Si OCR non disponible, on rejette
    if not OCR_AVAILABLE or reader is None:
        raise HTTPException(
            status_code=503,
            detail="Service OCR non disponible. Impossible de valider l'identité."
        )

    texts_cin = reader.readtext(img_cin, detail=0)
    name_cin = extract_names(texts_cin)
    full_cin = " ".join(texts_cin).upper()

    texts_permis = reader.readtext(img_permis, detail=0)
    name_permis = extract_names(texts_permis)
    full_permis = " ".join(texts_permis).upper()

    print(f"[OCR] CIN texte: {full_cin[:200]}")
    print(f"[OCR] Permis texte: {full_permis[:200]}")
    print(f"[OCR] Nom CIN: {name_cin} | Nom Permis: {name_permis}")

    c1 = set(name_cin.split())
    c2 = set(name_permis.split())
    names_match = len(c1.intersection(c2)) >= 1 if c1 and c2 else False

    cin_valide = (
        any(k in full_cin for k in ["NATIONALE", "IDENTITE", "MAROC", "NOM"])
        and len(name_cin) > 0
    )
    permis_valide = (
        any(k in full_permis for k in ["PERMIS", "CONDUIRE", "NOM"])
        and len(name_permis) > 0
    )

    return {
        "validation_document": {
            "cin_valide": cin_valide,
            "permis_valide": permis_valide,
            "names_match": names_match,
            "global_identity_valid": cin_valide and permis_valide and names_match,
        },
        "document_content": {
            "cin": {"name_extracted": name_cin},
            "permis": {"name_extracted": name_permis}
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
