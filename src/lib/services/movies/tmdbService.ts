// src/lib/api/tmdbService.ts
import apiClient from '@/lib/api/apiClient';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? '';

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  popularity: number;
  vote_count: number;
};

export type TVShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  return response.data.results;
};

export const fetchPopularTVShows = async (): Promise<TVShow[]> => {
  const response = await apiClient.get(`${TMDB_BASE_URL}/tv/popular`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await apiClient.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
    },
  });
  return response.data.results;
};

export const searchTVShows = async (query: string): Promise<TVShow[]> => {
  const response = await apiClient.get(`${TMDB_BASE_URL}/search/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
    },
  });
  return response.data.results;
};
