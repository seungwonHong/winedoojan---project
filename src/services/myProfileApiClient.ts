import { useAuthStore } from "@/store/authStore";
import { ErrorResponse } from "@/types/myprofileTypes";
const API_BASE_URL = "https://winereview-api.vercel.app";

const handle401 = async (res: Response) => {
  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) {
      throw new Error("AccessToken 갱신 실패");
    }

    const newToken = useAuthStore.getState().accessToken;
    return newToken;
  }
};

export async function get(
  url: string,
  limit: number,
  cursor?: number | null,
  token?: string | null
) {
  const newUrl = new URL(API_BASE_URL + url);
  newUrl.searchParams.append("limit", limit.toString());
  if (cursor !== undefined && cursor !== null) {
    newUrl.searchParams.append("cursor", cursor.toString());
  }

  let res = await fetch(newUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    const newToken = await handle401(res);

    res = await fetch(newUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
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

export async function del(url: string, token?: string | null) {
  const newUrl = new URL(API_BASE_URL + url);
  let res = await fetch(newUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    const newToken = await handle401(res);

    res = await fetch(newUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return await res.json();
}

export async function patch(url: string, data: {}, token?: string | null) {
  const newUrl = new URL(API_BASE_URL + url);
  let res = await fetch(newUrl, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  if (res.status === 401) {
    const newToken = await handle401(res);

    res = await fetch(newUrl, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${newToken}`,
      },
      body: JSON.stringify({ data }),
    });
  }
  return await res.json();
}

export async function post(url: string, data: any, token?: string | null) {
  const newUrl = new URL(API_BASE_URL + url);
  let res = await fetch(newUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  if (res.status === 401) {
    const newToken = await handle401(res);

    res = await fetch(newUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      body: data,
    });
  }

  if (!res.ok) {
    throw new Error(`이미지 업로드 실패: ${res.status}`);
  }

  return await res.json();
}
