import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
import { useAuthStore } from "@/store/authStore";
const API_BASE_URL = "https://winereview-api.vercel.app";

export async function get(url: string, limit: number, cursor?: number | null) {
  const newUrl = new URL(API_BASE_URL + url);
  newUrl.searchParams.append("limit", limit.toString());
  if (cursor !== undefined && cursor !== null) {
    newUrl.searchParams.append("cursor", cursor.toString());
  }

  return await handleResponseWithAuth(newUrl.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function del(url: string) {
  const newUrl = new URL(API_BASE_URL + url);

  return await handleResponseWithAuth(newUrl.toString(), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function patch(url: string, data: any) {
  const newUrl = new URL(API_BASE_URL + url);
  return await handleResponseWithAuth(newUrl.toString(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function post(url: string, data: any | null) {
  const newUrl = new URL(API_BASE_URL + url);
  return await handleResponseWithAuth(newUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function postNoHeader(
  url: string,
  data: any | null,
  token: string | null
) {
  const newUrl = new URL(API_BASE_URL + url);

  let res = await fetch(newUrl.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refreshAccessToken();
    if (!refreshed) throw new Error("AccessToken 갱신 실패");

    const newToken = useAuthStore.getState().accessToken;

    res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      body: data,
    });
  }

  return await res.json();
}
