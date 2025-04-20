require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const { initializeApp, getApps } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCWR4jyoZLs_Zxr4awGokeaqd-_cLUJu9w",
  authDomain: "cookease-eb3c6.firebaseapp.com",
  projectId: "cookease-eb3c6",
  storageBucket: "cookease-eb3c6.firebasestorage.app",
  messagingSenderId: "838279150450",
  appId: "1:838279150450:web:aa6246fa88c1ad0ad27beb",
  measurementId: "G-JBGBKLS0GT"
};

// Initialize Firebase App
const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const db = getFirestore(firebaseApp);

// CSV Upload Function
async function uploadCSV(path) {
  const rows = [];
  fs.createReadStream(path)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      console.log(`📄 Uploading ${rows.length} recipes...`);
      for (const row of rows) {
        try {
          await addDoc(collection(db, "recipes"), {
            name: row.name,
            calories: Number(row.calories),
            imageUrl: row.imageUrl || "", // ✅ Fix is here
            ingredients: row.ingredients ? row.ingredients.split(",").map(i => i.trim()) : [],
            instructions: row.instructions || "",
            createdBy: null,
            timestamp: new Date()
          });
          
          console.log("✅ Uploaded:", row.name);
        } catch (err) {
          console.error("❌ Error uploading:", row.name, err.message);
        }
      }
      console.log("🎉 CSV Upload Complete.");
    });
}

uploadCSV("/Users/rithikaashok/Downloads/Cookease-main/APICOOKEASE/RAW_recipes.csv"); // Drop your file in the same directory