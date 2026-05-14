from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import re

app = Flask(__name__)
CORS(app)  # Autorise React à contacter ce service

# 1. Chargement du modèle et des encodeurs
MODEL_PATH = 'uppcar_smart_search_model.joblib'

if not os.path.exists(MODEL_PATH):
    print(f"ERROR: Le fichier {MODEL_PATH} est introuvable !")
    print("Veuillez copier le fichier .joblib dans ce dossier.")
else:
    package = joblib.load(MODEL_PATH)
    model = package['model']
    label_encoders = package['label_encoders']
    le_target = package['le_target']
    features_names = package['features']
    print("✅ Modèle chargé avec succès !")

def extract_features_from_query(query):
    """Analyse la recherche pour extraire les informations connues"""
    query = query.lower()
    
    # Valeurs par défaut (les plus fréquentes dans le dataset)
    data = {
        'marque': 'dacia',
        'modele_clean': 'logan',
        'annee': 2022,
        'agence': 'Avis',
        'ville': 'casablanca'
    }

    # Tentative d'extraction de l'année (4 chiffres)
    years = re.findall(r'\b(20\d{2})\b', query)
    if years:
        data['annee'] = int(years[0])

    # Liste des marques connues pour l'extraction
    known_brands = list(label_encoders['marque'].classes_)
    for brand in known_brands:
        if brand.lower() in query:
            data['marque'] = brand
            break
            
    # Liste des villes connues
    known_villes = list(label_encoders['ville'].classes_)
    for ville in known_villes:
        if ville.lower() in query:
            data['ville'] = ville
            break

    return data

@app.route('/predict', methods=['GET'])
def predict():
    query = request.args.get('query', '')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    # 1. Extraire les infos de la phrase
    extracted = extract_features_from_query(query)
    
    search_keyword = query.lower()
    search_keyword = re.sub(r'\b\d+\b', '', search_keyword) # enlever les nombres
    search_keyword = search_keyword.replace('dh', '').replace('dhs', '').strip()

    # 2. Préparer pour le modèle (DataFrame)
    X_input = pd.DataFrame([extracted])
    
    # 3. Encoder les catégories comme pendant l'entraînement
    try:
        for col in X_input.columns:
            if col in label_encoders:
                val = str(X_input[col][0])
                if val not in label_encoders[col].classes_:
                    val = label_encoders[col].classes_[0]
                X_input[col] = label_encoders[col].transform([val])
        
        # 4. Prédiction
        pred_idx = model.predict(X_input)[0]
        category = le_target.inverse_transform([pred_idx])[0]
        
        return jsonify({
            'query': query,
            'clean_keyword': search_keyword,
            'prediction': category,
            'extracted_info': extracted
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Service IA UppCar démarré sur http://localhost:5000")
    app.run(port=5000, debug=False)
