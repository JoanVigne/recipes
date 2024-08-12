import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const fetchedRecipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    fetchedRecipes.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      }
      if (!a.createdAt) {
        return 1;
      }
      if (!b.createdAt) {
        return -1;
      }
      return 0;
    });
    /*     setRecipes(fetchedRecipes); */
    sessionStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
    return fetchedRecipes;
  } catch (err) {
    console.error(err);
  }
};
