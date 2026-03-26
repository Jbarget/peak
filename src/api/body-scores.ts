import { fetchJson } from './client';
import type { UserMeta } from './users';

export type BodyScoreCategory =
  | 'heart'
  | 'liver'
  | 'brain'
  | 'kidney'
  | 'hormones'
  | 'metabolism'
  | 'immunity'
  | 'skin'
  | 'bones'
  | 'gut'
  | (string & {});

export type BodyScore = {
  category: BodyScoreCategory;
  label: string;
  previousScore: number;
  score: number;
  updatedAt: string;
};

export type GetUserBodyScoresResponse = {
  data: {
    userId: string;
    chronologicalAge: number;
    biologicalAge: number;
    scores: BodyScore[];
  };
  meta: UserMeta;
};

export function fetchUserBodyScores(userId: string) {
  return fetchJson<GetUserBodyScoresResponse>(
    `/api/users/${encodeURIComponent(userId)}/body-scores`,
  );
}
