require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { fetchAndStoreRecipes } = require("./googleAPI");

const { initializeApp, getApps } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

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

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Cookease Firebase API!");
});

app.get("/recipes", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "recipes"));
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/import-recipes/:query", async (req, res) => {
  const { query } = req.params;
  try {
    await fetchAndStoreRecipes(query);
    res.json({ message: `Recipes for '${query}' imported successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});