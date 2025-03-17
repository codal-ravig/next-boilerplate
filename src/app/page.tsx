'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { fetchPopularMovies, Movie } from '@/lib/services/movies/tmdbService';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch movies
  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await fetchPopularMovies(page);
      setMovies((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies(page);
  }, []);

  // Infinite scroll logic
  const lastMovieRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, page, totalPages]
  );

  // Fetch next page when `page` changes
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  // Format release date
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
        {movies.map((movie, index) => {
          const isLastMovie = index === movies.length - 1;
          return (
            <Link
              key={movie.id + index}
              ref={isLastMovie ? lastMovieRef : null}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              href={`/movies/${movie.id}`}
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
            </Link>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="text-center text-white mt-8">
          Loading more movies...
        </div>
      )}
    </div>
  );
}
