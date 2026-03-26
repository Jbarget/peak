import { useQuery } from '@tanstack/react-query';

import { fetchBiomarkersDetail } from '@/api/biomarkers';
import type { BodyScoreCategory } from '@/api/body-scores';

export function biomarkersByCategoryQueryKey(category: BodyScoreCategory) {
  return ['biomarkers', { category }] as const;
}

export function useBiomarkersByCategory(category: BodyScoreCategory | undefined) {
  return useQuery({
    queryKey: category
      ? biomarkersByCategoryQueryKey(category)
      : ['biomarkers', { category: 'missing-category' }],
    queryFn: () => {
      if (!category) throw new Error('category is required');
      return fetchBiomarkersDetail(category);
    },
    enabled: Boolean(category),
  });
}
