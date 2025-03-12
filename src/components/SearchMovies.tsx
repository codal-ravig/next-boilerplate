'use client';
import React from 'react';
import { useState } from 'react';
import { Movie, searchMovies } from '@/lib/services/movies/tmdbService';
import Image from 'next/image';

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    const movies = await searchMovies(query);
    setResults(movies);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
