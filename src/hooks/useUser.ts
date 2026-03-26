import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '@/api/users';

export function userQueryKey(userId: string) {
  return ['user', userId] as const;
}

export function useUser(userId: string | undefined) {
  return useQuery({
    queryKey: userId ? userQueryKey(userId) : ['user', 'missing-id'],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return fetchUser(userId);
    },
    enabled: Boolean(userId),
  });
}
