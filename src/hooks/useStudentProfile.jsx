// src/hooks/useStudentProfile.js
import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function useStudentProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "students", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return profile;
}
