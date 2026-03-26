import { BodyScoreCategory } from './body-scores';
import { fetchJson } from './client';
import type { UserMeta } from './users';

export type BiomarkerDirection = 'higher_is_better' | 'lower_is_better' | 'middle_is_optimal';

export type BiomarkerRange = { min: number; max: number };

export type BiomarkerRanges = {
  improve: BiomarkerRange;
  good: BiomarkerRange;
  optimal: BiomarkerRange;
};

export type BiomarkerStatus = 'improve' | 'good' | 'optimal';

export type Biomarker = {
  biomarkerId: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  status: BiomarkerStatus;
  direction: BiomarkerDirection;
  ranges: BiomarkerRanges;
  testedAt: string;
};

export type GetUserBiomarkersResponse = {
  data: { results: Biomarker[] };
  meta: UserMeta;
};

export function fetchUserBiomarkersByCategory(userId: string, category: BodyScoreCategory) {
  const qs = new URLSearchParams({ category });
  return fetchJson<GetUserBiomarkersResponse>(
    `/api/users/${encodeURIComponent(userId)}/biomarkers?${qs.toString()}`,
  );
}

export type BiomarkerDetail = {
  id: string;
  name: string;
  category: string;
  description: string;
  direction: BiomarkerDirection;
  ranges: Record<string, unknown>;
  unit: string;
};

export type BiomarkersDetail = BiomarkerDetail[];

export type GetBiomarkersDetailResponse = {
  data: BiomarkersDetail;
  meta: UserMeta;
};

export function fetchBiomarkersDetail(category: BodyScoreCategory) {
  return fetchJson<GetBiomarkersDetailResponse>(
    `/api/biomarkers?category=${encodeURIComponent(category)}`,
  );
}
