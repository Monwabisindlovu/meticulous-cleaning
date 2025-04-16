// firestoreUtils.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const submitQuoteToFirestore = async (quoteData) => {
  try {
    console.log("📦 Submitting quote to Firestore:", quoteData);

    // Required field validation
    if (!quoteData.fullName || !quoteData.email || !quoteData.services || quoteData.services.length === 0) {
      throw new Error("Missing required fields: fullName, email, or services.");
    }

    // Write to Firestore
    const docRef = await addDoc(collection(db, "quoteRequests"), {
      ...quoteData,
      timestamp: new Date(),
    });

    console.log("✅ Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore submission failed:", error.message);
    throw error;
  }
};
