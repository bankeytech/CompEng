// src/utils/studentData.js
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const STORAGE_KEY = (uid) => `student_results_${uid}`;

/**
 * Load results for a student (sessionStorage first, then Firestore)
 * returns an object: { [semesterId]: { GPA, grades: { courseId: { name, mark } }, createdAt } }
 */
export const loadResults = async (uid) => {
  try {
    if (!uid) return {};

    // 1) sessionStorage
    const cached = sessionStorage.getItem(STORAGE_KEY(uid));
    if (cached) return JSON.parse(cached);

    // 2) Firestore: read all docs in students/{uid}/results
    const snap = await getDocs(collection(db, "students", uid, "results"));
    const data = {};
    snap.forEach((docSnap) => {
      data[docSnap.id] = docSnap.data();
    });

    sessionStorage.setItem(STORAGE_KEY(uid), JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("loadResults error:", err);
    return {};
  }
};

/**
 * Save a semester result for a student (Firestore + sessionStorage)
 * grades is expected to be an object: { courseId: { name, mark } }
 */
export const saveResult = async (uid, semesterId, GPA, grades = {}) => {
  try {
    if (!uid || !semesterId) throw new Error("uid and semesterId required");

    const ref = doc(db, "students", uid, "results", semesterId);
    const payload = {
      GPA,
      grades,
      createdAt: new Date().toISOString(),
    };

    await setDoc(ref, payload);

    // update sessionStorage cache
    const current = (await loadResults(uid)) || {};
    const updated = { ...current, [semesterId]: payload };
    sessionStorage.setItem(STORAGE_KEY(uid), JSON.stringify(updated));

    return true;
  } catch (err) {
    console.error("saveResult error:", err);
    return false;
  }
};





























































// // src/utils/studentData.js
// import { db } from "../firebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// // Key for sessionStorage
// const STORAGE_KEY = (uid) => `student_results_${uid}`;

// /**
//  * Load results for a student
//  * @param {string} uid - student ID
//  */
// export const loadResults = async (uid) => {
//   try {
//     // 1. Try from sessionStorage
//     const cached = sessionStorage.getItem(STORAGE_KEY(uid));
//     if (cached) return JSON.parse(cached);

//     // 2. Fetch from Firestore
//     const ref = doc(db, "results", uid);
//     const snap = await getDoc(ref);

//     if (snap.exists()) {
//       const data = snap.data();
//       sessionStorage.setItem(STORAGE_KEY(uid), JSON.stringify(data));
//       return data;
//     }

//     return {}; // default empty if none exists
//   } catch (err) {
//     console.error("Error loading results:", err);
//     return {};
//   }
// };

// /**
//  * Save results for a student
//  * @param {string} uid - student ID
//  * @param {string} semesterId - e.g. "2023/2024 - 1st Semester"
//  * @param {string} GPA - semester GPA
//  * @param {object} grades - courseCode → mark/grade
//  */
// export const saveResult = async (uid, semesterId, GPA, grades) => {
//   try {
//     // Load existing
//     const current = await loadResults(uid);

//     // Update with new semester result
//     const updated = { ...current, [semesterId]: { GPA, grades } };

//     // Save to Firestore
//     const ref = doc(db, "results", uid);
//     await setDoc(ref, updated);

//     // Save to sessionStorage
//     sessionStorage.setItem(STORAGE_KEY(uid), JSON.stringify(updated));

//     return true;
//   } catch (err) {
//     console.error("Error saving result:", err);
//     return false;
//   }
// };
