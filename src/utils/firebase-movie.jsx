// Firebase utility functions for movie management
import { db } from '../firebase'; // Ensure this points to your Firebase config
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';

export const initializeUserMovies = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    
    try {
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Create the document if it doesn't exist
        await setDoc(userDocRef, {
          movies: [],
          selectedMovies: []
        });
      }
      return true;
    } catch (error) {
      console.error("Error initializing user movies:", error);
      return false;
    }
  };
// Add a movie to user's list
export const addMovieToList = async (userId, movie) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userDocRef, {
      movies: arrayUnion(movie)
    });
    return true;
  } catch (error) {
    console.error("Error adding movie:", error);
    return false;
  }
};

// Remove a movie from user's list
export const removeMovieFromList = async (userId, movie) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userDocRef, {
      movies: arrayRemove(movie)
    });
    return true;
  } catch (error) {
    console.error("Error removing movie:", error);
    return false;
  }
};

// Get user's movie list
export const getUserMovies = async (userId) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().movies || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Update selected movie
export const updateSelectedMovie = async (userId, movie) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userDocRef, {
      selectedMovies: arrayUnion(movie)
    });
    return true;
  } catch (error) {
    console.error("Error updating selected movie:", error);
    return false;
  }
};