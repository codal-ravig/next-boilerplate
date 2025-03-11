import apiClient from '@/lib/api/apiClient';

// Example of a service that fetches posts from a REST API

export type Post = {
  id: number;
  title: string;
  body: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts');
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', post);
  return response.data;
};

export const updatePost = async (
  id: number,
  post: Partial<Post>
): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
