// src/lib/api/omdbService.ts
import apiClient from '@/lib/api/apiClient';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL ?? '';

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await apiClient.get(OMDB_BASE_URL, {
    params: {
      apikey: OMDB_API_KEY,
      s: query,
    },
  });

  return response.data.Search || [];
};
