import React, { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { addMovieToList } from '../utils/firebase-movie';

function AddMovie() {
  const [movieName, setMovieName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserAuth();

  const fetchMoviePoster = async (movieName) => {
    try {
      const response = await fetch('https://nxt-movie-1.onrender.com/get-movie-poster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ movie_name: movieName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch movie poster');
      }

      const data = await response.json();
      return data.poster_url;
    } catch (error) {
      console.error('Error fetching movie poster:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!movieName.trim()) return;

    setIsLoading(true);

    try {
      // Fetch the movie poster URL
      const imageUrl = await fetchMoviePoster(movieName);
      
      if (!imageUrl) {
        alert('Could not find movie poster. Please try a different movie name.');
        setIsLoading(false);
        return;
      }

      const movie = {
        name: movieName,
        image: imageUrl
      };

      if (user?.uid) {
        const success = await addMovieToList(user.uid, movie);
        if (success) {
          setMovieName('');
          alert('Movie added successfully!');
        } else {
          alert('Failed to add movie to your list.');
        }
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('An error occurred while adding the movie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <input
        className="inputfield"
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Add movie"
        required
        disabled={isLoading}
      />
      <button 
        className="add-button" 
        type="submit" 
        disabled={isLoading || !movieName.trim()}
      >
        {isLoading ? 'SEARCHING...' : 'ADD'}
      </button>
    </form>
  );
}

export default AddMovie;