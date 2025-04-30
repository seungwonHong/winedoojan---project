import {
  ReviewsResponse,
  WinesResponse,
  UpdateUserResponse,
} from "@/types/myprofileTypes";
import { get, del, patch, post, postNoHeader } from "./myProfileApiClient";

// {teamId}/users/me/reviews
interface fetchParams {
  teamId: string | null;
  token: string | null;
}

interface fetchGetParams extends fetchParams {
  limit: number;
  cursor?: number | null;
}

interface fetchUpdateImgParams extends fetchParams {
  image: string | null;
}

interface fetchUpdateNicknameParams extends fetchParams {
  nickname: string;
}

interface fetchDeleteParams extends fetchParams {
  id: number;
}

interface fetchUploadImageParams extends fetchParams {
  file: File;
}

export async function fetchReviews({
  teamId,
  limit,
  cursor,
}: fetchGetParams): Promise<ReviewsResponse> {
  const res = await get(`/${teamId}/users/me/reviews`, limit, cursor);
  return await res.json();
}

// {teamId}/users/me/wines
export async function fetchWines({
  teamId,
  limit,
  cursor,
}: fetchGetParams): Promise<WinesResponse> {
  const res = await get(`/${teamId}/users/me/wines`, limit, cursor);
  return await res.json();
}

// {teamId}/users/me
export async function fetchUpdateImg({
  teamId,
  image,
}: fetchUpdateImgParams): Promise<UpdateUserResponse> {
  const res = await patch(`/${teamId}/users/me`, { image });
  return await res.json();
}

export async function fetchUpdateNickname({
  teamId,
  nickname,
}: fetchUpdateNicknameParams): Promise<UpdateUserResponse> {
  const res = await patch(`/${teamId}/users/me`, { nickname });
  return await res.json();
}

// {teamId}/wines/{id}
export async function fetchDeleteWineId({ teamId, id }: fetchDeleteParams) {
  const res = await del(`/${teamId}/wines/${id}`);
  return await res.json();
}

// {teamId}/reviews/{id}
export async function fetchDeleteReviewId({ teamId, id }: fetchDeleteParams) {
  const res = await del(`/${teamId}/reviews/${id}`);
  return await res.json();
}

// {teamId}/images/upload
export async function fetchUploadImage({
  teamId,
  file,
  token,
}: fetchUploadImageParams) {
  const formData = new FormData();
  formData.append("image", file);

  return await postNoHeader(`/${teamId}/images/upload`, formData, token);
}
