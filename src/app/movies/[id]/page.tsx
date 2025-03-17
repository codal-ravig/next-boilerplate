// src/app/movies/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import { fetchMovieDetails } from '@/lib/services/movies/tmdbService';
import { Movie } from '@/lib/services/movies/tmdbService';
import { PageProps } from '../../../../.next/types/app/movies/[id]/page';

interface MovieDetailsProps {
  params: {
    id: string;
  };
}
type Union<T> = T & MovieDetailsProps;
export default async function MovieDetails({ params }: Union<PageProps>) {
  const movie: Movie = await fetchMovieDetails(params.id);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Backdrop Image */}
      <div className="relative h-96">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Movie Details */}
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-400 mb-6">{movie.overview}</p>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="font-medium">Release Date:</span>{' '}
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Original Language:</span>{' '}
                {movie.original_language.toUpperCase()}
              </div>
              <div>
                <span className="font-medium">Runtime:</span> {movie.runtime}{' '}
                minutes
              </div>
              <div>
                <span className="font-medium">Status:</span> {movie.status}
              </div>
              <div>
                <span className="font-medium">Genres:</span>{' '}
                {movie.genres.map((genre) => genre.name).join(', ')}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Ratings</h2>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="font-medium">Rating:</span>{' '}
                <span className="text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div>
                <span className="font-medium">Total Votes:</span>{' '}
                {movie.vote_count.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Popularity:</span>{' '}
                {movie.popularity.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
