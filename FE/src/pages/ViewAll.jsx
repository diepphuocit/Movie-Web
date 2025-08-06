import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewAll = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M5N2Y0YWY3YzBlNWNhYzRkZTVjNTJiMTZiYjdhNCIsIm5iZiI6MTc1MzUxNTAzMi40MjksInN1YiI6IjY4ODQ4NDE4ZmJjYzJiNjkxNzM4ZjZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biEs1AATR9lWqZoD__cFiG5vZIwhB_Cr1rUR7xOri7E'
    }
  };

  useEffect(() => {
    if (!category) return;

    fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-2 rounded">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : '/fallback.jpg'
                }
                alt={movie.title}
                className="w-full h-72 object-cover rounded"
              />
              <p className="mt-2 text-sm">{movie.title}</p>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAll;

      
    