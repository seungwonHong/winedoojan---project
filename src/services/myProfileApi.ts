import {
  ErrorResponse,
  ReviewsResponse,
  WinesResponse,
  UpdateUserResponse,
} from '@/types/myprofileTypes';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'https://winereview-api.vercel.app';

// {teamId}/users/me/reviews
interface FetchReviewsParams {
  teamId: string | null;
  limit: number;
  cursor?: number;
  token: string | null;
}

interface FetchWinesParams {
  teamId: string;
  limit: number;
  cursor?: number;
  token: string | null;
}

interface fetchUpdateUserParams {
  teamId: string;
  image: string | null;
  nickname: string;
  token: string | null;
}

interface fetchDeleteWineIdParams {
  teamId: string;
  id: number;
  token: string | null;
}

interface fetchDeleteReviewIdParams {
  teamId: string;
  id: number;
  token: string | null;
}

//추상화해보기

export async function fetchReviews({
  teamId,
  limit,
  cursor,
  token,
}: FetchReviewsParams): Promise<ReviewsResponse> {
  const url = new URL(`${API_BASE_URL}/${teamId}/users/me/reviews`);
  url.searchParams.append('limit', limit.toString());
  if (cursor) url.searchParams.append('cursor', cursor.toString());

  let res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) {
      throw new Error('AccessToken 갱신 실패');
    }

    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
    });
  }
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
  url.searchParams.append('limit', limit.toString());
  if (cursor) url.searchParams.append('cursor', cursor.toString());

  let res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) {
      throw new Error('AccessToken 갱신 실패');
    }

    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
    });
  }
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
}

// {teamId}/users/me
export async function fetchUpdateUser({
  teamId,
  image,
  nickname,
  token,
}: fetchUpdateUserParams): Promise<UpdateUserResponse> {
  const url = new URL(`${API_BASE_URL}/${teamId}/users/me`);
  console.log('accesstoken', token);
  let res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, nickname }),
  });
  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) {
      throw new Error('AccessToken 갱신실패');
    }
    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
      body: JSON.stringify({ image, nickname }),
    });
  }
  return await res.json();
}

// {teamId}/wines/{id}
export async function fetchDeleteWineId({
  teamId,
  id,
  token,
}: fetchDeleteWineIdParams) {
  const url = new URL(`${API_BASE_URL}/${teamId}/wines/${id}`);
  let res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) {
      throw new Error('AccessToken 갱신실패');
    }
    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return await res.json();
}

// {teamId}/reviews/id
export async function fetchDeleteReviewId({
  teamId,
  id,
  token,
}: fetchDeleteReviewIdParams) {
  const url = new URL(`${API_BASE_URL}/${teamId}/reviews/${id}`);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return await res.json();
}

// {teamId}/images/upload
export async function fetchUploadImage(
  teamId: string,
  token: string | null,
  file: File
) {
  const url = new URL(`${API_BASE_URL}/${teamId}/images/upload`);

  const formData = new FormData();
  formData.append('image', file);

  let res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) throw new Error('AccessToken 갱신 실패');

    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      body: formData,
    });
  }

  if (!res.ok) {
    throw new Error(`이미지 업로드 실패: ${res.status}`);
  }

  return await res.json();
}
