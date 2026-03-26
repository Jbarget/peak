import { fetchJson } from './client';
import type { UserMeta } from './users';

export type Biomarker = Record<string, unknown>;

export type GetUserBiomarkersResponse = {
  data: { results: Biomarker[] };
  meta: UserMeta;
};

export function fetchUserBiomarkers(userId: string) {
  return fetchJson<GetUserBiomarkersResponse>(
    `/api/users/${encodeURIComponent(userId)}/biomarkers`,
  );
}
