import {
  ErrorResponse,
  ReviewsResponse,
  WinesResponse,
  UpdateUserResponse,
} from "@/types/myprofileTypes";

const API_BASE_URL = "https://winereview-api.vercel.app";

// {teamId}/users/me/reviews
interface FetchReviewsParams {
  teamId: string;
  limit: number;
  cursor?: number;
  token: string;
}

interface FetchWinesParams {
  teamId: string;
  limit: number;
  cursor?: number;
  token: string;
}

interface fetchUpdateUserParams {
  teamId: string;
  image: string;
  nickname: string;
}

export async function fetchReviews({
  teamId,
  limit,
  cursor,
  token,
}: FetchReviewsParams): Promise<ReviewsResponse> {
  const url = new URL(`${API_BASE_URL}/${teamId}/users/me/reviews`);
  url.searchParams.append("limit", limit.toString());
  if (cursor) url.searchParams.append("cursor", cursor.toString());

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
}

// {teamId}/users/me/wines
export async function fetchWines({
  teamId,
  limit,
  cursor,
  token,
}: FetchWinesParams): Promise<WinesResponse> {
  const url = new URL(`${API_BASE_URL}/${teamId}/users/me/wines`);
  url.searchParams.append("limit", limit.toString());
  if (cursor) url.searchParams.append("cursor", cursor.toString());

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
}

// 로그인(임시)
export async function fetchLogin(teamId: string) {
  const url = new URL(`${API_BASE_URL}/${teamId}/auth/signIn`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: "example@email.com", password: "password" }),
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return await res.json();
}

// {teamId}/users/me
export async function fetchUpdateUser({
  teamId,
  image,
  nickname,
}: fetchUpdateUserParams): Promise<UpdateUserResponse> {
  const url = new URL(`${API_BASE_URL}/${teamId}/users/me`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ image, nickname }),
  });
  return await res.json();
}
