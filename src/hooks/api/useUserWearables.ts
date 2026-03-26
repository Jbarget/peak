import { useQuery } from '@tanstack/react-query';

import { fetchUserWearables } from '@/api/wearables';

export function userWearablesQueryKey(userId: string) {
  return ['user', userId, 'wearables'] as const;
}

export function useUserWearables(userId: string | undefined) {
  return useQuery({
    queryKey: userId ? userWearablesQueryKey(userId) : ['user', 'missing-id', 'wearables'],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return fetchUserWearables(userId);
    },
    enabled: Boolean(userId),
  });
}
