import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
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
