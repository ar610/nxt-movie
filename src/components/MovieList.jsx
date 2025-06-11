import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import {
  getUserMovies,
  removeMovieFromList,
  initializeUserMovies,
} from "../utils/firebase-movie";
import "./MovieList.css"; // We'll create this CSS file
import { MdDelete } from "react-icons/md"; // Material Design trash icon

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const { user } = useUserAuth();

  useEffect(() => {
    if (user?.uid) {
      loadUserMovies();
    }
  }, [user]);

  const loadUserMovies = async () => {
    try {
      setLoading(true);
      // Initialize user document if it doesn't exist
      await initializeUserMovies(user.uid);
      // Get user's movies
      const userMovies = await getUserMovies(user.uid);
      setMovies(userMovies);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieToDelete) => {
    if (!user?.uid) return;

    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${movieToDelete.name}" from your list?`
    );

    if (!isConfirmed) return;

    try {
      setDeletingMovie(movieToDelete);

      // Remove from Firebase
      const success = await removeMovieFromList(user.uid, movieToDelete);

      if (success) {
        // Remove from local state
        setMovies((prevMovies) =>
          prevMovies.filter(
            (movie) =>
              !(
                movie.name === movieToDelete.name &&
                movie.image === movieToDelete.image
              )
          )
        );
      } else {
        alert("Failed to delete movie. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("An error occurred while deleting the movie.");
    } finally {
      setDeletingMovie(null);
    }
  };

  if (loading) {
    return (
      <div className="movie-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="movie-list-container">
        <div className="empty-state">
          <h2>No Movies Yet</h2>
          <p>You haven't added any movies to your list yet.</p>
          <p>Start by adding some movies!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        <h1>My Watch List</h1>
        <p className="movie-count">
          {movies.length} movie{movies.length !== 1 ? "s" : ""} in your
          collection
        </p>
      </div>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={`${movie.name}-${index}`} className="movie-card">
            <div className="movie-poster">
              <img
                src={movie.image}
                alt={`${movie.name} poster`}
                onError={(e) => {
                  e.target.src = "/placeholder-movie.jpg"; // Fallback image
                  e.target.alt = "Movie poster not available";
                }}
              />
            </div>

            <div className="movie-info">
              <h3 className="movie-title">{movie.name}</h3>
            </div>

            <button
              className={`delete-button ${
                deletingMovie === movie ? "deleting" : ""
              }`}
              onClick={() => handleDeleteMovie(movie)}
              disabled={deletingMovie === movie}
              aria-label={`Delete ${movie.name}`}
            >
              {deletingMovie === movie ? (
                <div className="delete-spinner"></div>
              ) : (
                <MdDelete size={20} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
