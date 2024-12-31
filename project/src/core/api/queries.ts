import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { apiClient } from './client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

export function useContent(id: string) {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => apiClient.fetch(`/api/content/${id}`),
  });
}