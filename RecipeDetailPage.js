import { useParams, useNavigate } from "react-router-dom";

const mockRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      calories: 550,
      image: "https://images.pexels.com/photos/29039082/pexels-photo-29039082.jpeg",
    },
    {
      id: 2,
      title: "Avocado Toast",
      calories: 580,
      image: "https://images.pexels.com/photos/1321942/pexels-photo-1321942.jpeg",
    },
    {
      id: 3,
      title: "Chicken Curry",
      calories: 620,
      image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
    },
  ];
  

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes.find((r) => r.id === Number(id));

  const handleDelete = () => {
    alert("🔔 Recipe deleted (pretend!)");
    navigate("/recipes");
  };

  const handleEdit = () => {
    alert("✏️ Edit functionality coming soon!");
  };

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="login-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <p>Calories: {recipe.calories}</p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleEdit} style={{ marginRight: "1rem" }}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
