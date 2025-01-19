import React, { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { addMovieToList } from '../utils/firebase-movie';

function AddMovie() {
  const [movieName, setMovieName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!movieName || !imageUrl) return;

    const movie = {
      name: movieName,
      image: imageUrl
    };

    if (user?.uid) {
      const success = await addMovieToList(user.uid, movie);
      if (success) {
        setMovieName('');
        setImageUrl('');
        // Optionally add some user feedback here
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Movie Name"
        required
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Movie Poster URL"
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovie;