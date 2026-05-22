const fs = require('fs');
const dotenv = require('dotenv');

// Charger le .env manuellement
const envConfig = dotenv.parse(fs.readFileSync('C:/Users/digit/Desktop/UppCar/front/.env'));
const apiKey = envConfig.REACT_APP_GEMINI_API_KEY;

const DB_CARS = [
    "Ford EcoSport", "Honda Jazz", "Kia Rio", "Peugeot Partner", "Toyota Corolla", 
    "Renault Captur", "Dacia Dokker", "Ford Focus", "Kia Sportage", "Peugeot 208", 
    "Honda City", "Kia Picanto", "Volkswagen Golf", "BMW Serie 3", "Peugeot 301", 
    "Mercedes Classe C", "Audi A4", "Nissan Qashqai", "Renault Symbol", "Dacia Sandero", 
    "Seat Ibiza", "Skoda Octavia", "Fiat 500", "Dacia Stepway", "Range Rover", 
    "Renault Kango", "Dacia Duster"
];

const prompt = `
Tu es l'assistant de recherche intelligent d'UppCar.
L'utilisateur a tapé cette requête: "je cherche un Dacia logan".

Voici les voitures réellement disponibles dans notre flotte :
${DB_CARS.join(", ")}

Voici les seules catégories (transmissions) acceptées par le backend :
- "automatique"
- "manuel"

Ton but est d'extraire :
1. "prediction" : "automatique" ou "manuel" si l'utilisateur demande explicitement une boîte de vitesse. Sinon, laisse vide "".
2. "clean_keyword" : le nom exact de la marque ou du modèle de voiture parmi la liste ci-dessus qui correspond le mieux à sa demande.
   - IMPORTANT : Si l'utilisateur mentionne une voiture qui n'est PAS dans notre flotte (ex: "Dacia Logan", "Clio"), cherche si la marque existe chez nous (ex: "Dacia", "Peugeot"). Si la marque existe, renvoie UNIQUEMENT le nom de la marque (ex: "Dacia" ou "Renault" ou "Peugeot").
   - Si la demande est générale pour un type de carrosserie (ex: "grosse voiture", "SUV", "4x4"), choisis un modèle adapté de la liste (ex: "Duster", "Range Rover", "Sportage", "Qashqai").
   - Si la demande est "luxe", "sportive" ou "haut de gamme", choisis "BMW", "Mercedes", "Audi" ou "Range Rover".
   - Si la demande est "économique", "petite", ou "pas cher", choisis "Picanto", "Fiat 500", "Jazz", "Rio" ou "Sandero".
   - Si l'utilisateur mentionne directement une marque ou modèle de la liste (ex: "Golf", "Peugeot", "Corolla"), écris précisément ce nom de modèle.
   - S'il n'y a aucune correspondance logique, laisse vide "".
3. "city" : la ville mentionnée si elle correspond à l'une de nos villes de service (ex: "Casablanca", "Fés"). Sinon, laisse vide "".

Réponds UNIQUEMENT au format JSON strict, sans aucun texte autour :
{
  "prediction": "automatique ou manuel ou vide",
  "clean_keyword": "marque ou modèle choisi ou vide",
  "city": "ville extraite ou vide"
}`;

async function test() {
    console.log("1. Test de l'API Gemini...");
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!res.ok) {
            console.error("Erreur HTTP Gemini:", res.status, await res.text());
            return;
        }

        const data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        console.log("Réponse brute de Gemini:", text);
        
        text = text.replace(/```json/gi, "").replace(/```/gi, "").trim();
        const parsed = JSON.parse(text);
        console.log("JSON extrait:", parsed);

        const category = parsed.prediction || "";
        let searchKeyword = parsed.clean_keyword || "";
        
        // Simuler le code du frontend
        const finalQuery = searchKeyword.trim();
        console.log(`2. Interrogation du backend Java avec query='${finalQuery}' & category='${category}'`);
        
        const backendRes = await fetch(`http://localhost:8080/api/cars/search?query=${encodeURIComponent(finalQuery)}&category=${category}`);
        if (!backendRes.ok) {
            console.error("Erreur HTTP Backend:", backendRes.status);
            return;
        }
        
        const cars = await backendRes.json();
        console.log(`Résultats trouvés : ${cars.length} voiture(s)`);
        if (cars.length > 0) {
            console.log(cars.map(c => `- ${c.name} (${c.category})`).join("\n"));
        }
        
    } catch (e) {
        console.error("Exception:", e);
    }
}

test();
