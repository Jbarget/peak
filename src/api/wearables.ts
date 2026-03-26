import { fetchJson } from './client';
import type { UserMeta } from './users';

export type WearablesSource = 'whoop' | (string & {});

export type WearableDay = {
  date: string; // YYYY-MM-DD
  caloriesBurned: number;
  steps: number;
  strain: number;
  recoveryScore: number;
  restingHeartRate: number;
  respiratoryRate: number;
  hrvMs: number;
  heartRateZones: any[];
  workouts: any[];
  sleep: any | null;
};

export type GetUserWearablesResponse = {
  data: {
    days: WearableDay[];
    source: WearablesSource;
  };
  meta: UserMeta;
};

export function fetchUserWearables(userId: string) {
  return fetchJson<GetUserWearablesResponse>(`/api/users/${encodeURIComponent(userId)}/wearables`);
}
