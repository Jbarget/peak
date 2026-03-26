import { useQuery } from '@tanstack/react-query';

import { fetchUserBodyScores } from '@/api/body-scores';

export function userBodyScoresQueryKey(userId: string) {
  return ['user', userId, 'body-scores'] as const;
}

export function useUserBodyScores(userId: string | undefined) {
  return useQuery({
    queryKey: userId ? userBodyScoresQueryKey(userId) : ['user', 'missing-id', 'body-scores'],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return fetchUserBodyScores(userId);
    },
    enabled: Boolean(userId),
  });
}
