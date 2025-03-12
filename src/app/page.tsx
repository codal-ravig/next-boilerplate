import React from 'react';
import { fetchPopularMovies } from '@/lib/services/movies/tmdbService';
import Image from 'next/image';

export default async function Home() {
  const movies = await fetchPopularMovies();

  // Function to format the release date
  const formatReleaseDate = (dateString: string, language: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Popular Movies</h1>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Movie Poster */}
            <div className="relative h-64">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Movie Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-3">
                {movie.overview}
              </p>

              {/* Additional Details */}
              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <div>
                  <span className="font-medium">Release Date:</span>{' '}
                  {formatReleaseDate(
                    movie.release_date,
                    movie.original_language
                  )}
                </div>
                <div>
                  <span className="font-medium">Original Language:</span>{' '}
                  {movie.original_language.toUpperCase()}
                </div>
                <div>
                  <span className="font-medium">Popularity:</span>{' '}
                  {movie.popularity.toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Total Votes:</span>{' '}
                  {movie.vote_count.toLocaleString()}
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-yellow-400 text-sm">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
