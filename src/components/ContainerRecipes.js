import { db } from "../firebaseConfig";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export default function ContainerRecipes() {
  const [value, loading, error] = useCollection(collection(db, "recipes"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const recipes = value
    ? value.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render your recipes or handle them as needed
  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
}
