import { useEffect, useState } from "react";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:3000/recipes");
        const data = await res.json();
        console.log("📥 Recipes from backend:", data);
        setRecipes(data);
      } catch (err) {
        console.error("❌ Failed to fetch recipes:", err.message);
      }
    };
    fetchRecipes();
  }, []);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>🍽️ Recipes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {recipes.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
            <h4>{r.name}</h4>
            {r.imageUrl && <img src={r.imageUrl} alt={r.name} style={{ width: "100%", borderRadius: "6px" }} />}
            <p><strong>Calories:</strong> {r.calories}</p>
            <p><strong>Ingredients:</strong> {r.ingredients?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;
