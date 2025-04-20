require("dotenv").config();
const axios = require("axios");
const { initializeApp, getApps } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCWR4jyoZLs_Zxr4awGokeaqd-_cLUJu9w",
  authDomain: "cookease-eb3c6.firebaseapp.com",
  projectId: "cookease-eb3c6",
  storageBucket: "cookease-eb3c6.firebasestorage.app",
  messagingSenderId: "838279150450",
  appId: "1:838279150450:web:aa6246fa88c1ad0ad27beb",
  measurementId: "G-JBGBKLS0GT"
};
const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const db = getFirestore(firebaseApp);

async function fetchRecipes(query) {
  console.log("📡 [fetchRecipes] Query:", query);
  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}+recipe&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await axios.get(url);
    console.log("✅ [fetchRecipes] Got response from Google");
    console.log("🧾 Full Google API Response:", JSON.stringify(response.data, null, 2));

    const items = response.data.items || [];
    return items.map(item => ({
      name: item.title,
      imageUrl: item.pagemap?.cse_image?.[0]?.src || "",
      sourceLink: item.link,
      snippet: item.snippet,
      createdBy: null,
      timestamp: new Date()
    }));
  } catch (error) {
    console.error("❌ [fetchRecipes] Error fetching recipes:", error.message);
    return [];
  }
}

async function fetchAndStoreRecipes(query) {
  console.log("💾 [fetchAndStoreRecipes] Saving to Firestore for:", query);
  const recipes = await fetchRecipes(query);
  console.log(`📥 [fetchAndStoreRecipes] Number of recipes fetched: ${recipes.length}`);

  for (const recipe of recipes) {
    try {
      await addDoc(collection(db, "recipes"), recipe);
      console.log("✅ [Firestore] Added:", recipe.name);
    } catch (err) {
      console.error("❌ [Firestore] Error adding recipe:", err.message);
    }
  }
}

module.exports = { fetchAndStoreRecipes };