import { fetchJson } from './client';

export type UserSex = 'male' | 'female' | 'intersex' | 'unknown';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  dateOfBirth: string;
  sex: UserSex;
};

export type UserMeta = {
  requestedAt: string;
  userId: string;
};

export type GetUserResponse = {
  data: User;
  meta: UserMeta;
};

export function fetchUser(userId: string) {
  return fetchJson<GetUserResponse>(`/api/users/${encodeURIComponent(userId)}`);
}
