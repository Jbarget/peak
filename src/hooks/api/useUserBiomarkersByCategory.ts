import { useQuery } from '@tanstack/react-query';

import { fetchUserBiomarkersByCategory } from '@/api/biomarkers';
import type { BodyScoreCategory } from '@/api/body-scores';

export function userBiomarkersByCategoryQueryKey(userId: string, category: BodyScoreCategory) {
  return ['user', userId, 'biomarkers', { category }] as const;
}

export function useUserBiomarkersByCategory(
  userId: string | undefined,
  category: BodyScoreCategory | undefined,
) {
  return useQuery({
    queryKey:
      userId && category
        ? userBiomarkersByCategoryQueryKey(userId, category)
        : ['user', 'missing-id', 'biomarkers', { category: category ?? 'missing-category' }],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      if (!category) throw new Error('category is required');
      return fetchUserBiomarkersByCategory(userId, category);
    },
    enabled: Boolean(userId && category),
  });
}
