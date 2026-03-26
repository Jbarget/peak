import { useQuery } from '@tanstack/react-query';

import { fetchUserBiomarkers } from '@/api/biomarkers';

export function userBiomarkersQueryKey(userId: string) {
  return ['user', userId, 'biomarkers'] as const;
}

export function useUserBiomarkers(userId: string | undefined) {
  return useQuery({
    queryKey: userId ? userBiomarkersQueryKey(userId) : ['user', 'missing-id', 'biomarkers'],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return fetchUserBiomarkers(userId);
    },
    enabled: Boolean(userId),
  });
}
