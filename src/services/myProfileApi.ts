import {
  ReviewsResponse,
  WinesResponse,
  UpdateUserResponse,
} from "@/types/myprofileTypes";
import { get, del, patch, post } from "./myProfileApiClient";

// {teamId}/users/me/reviews
interface fetchParams {
  teamId: string | null;
  token: string | null;
}

interface fetchGetParams extends fetchParams {
  limit: number;
  cursor?: number | null;
}

interface fetchUpdateUserParams extends fetchParams {
  image: string | null;
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
  token,
}: fetchGetParams): Promise<ReviewsResponse> {
  return get(`/${teamId}/users/me/reviews`, limit, cursor, token);
}

// {teamId}/users/me/wines
export async function fetchWines({
  teamId,
  limit,
  cursor,
  token,
}: fetchGetParams): Promise<WinesResponse> {
  return get(`/${teamId}/users/me/wines`, limit, cursor, token);
}

// {teamId}/users/me
export async function fetchUpdateUser({
  teamId,
  image,
  nickname,
  token,
}: fetchUpdateUserParams): Promise<UpdateUserResponse> {
  return patch(`/${teamId}/users/me`, { image, nickname }, token);
}

// {teamId}/wines/{id}
export async function fetchDeleteWineId({
  teamId,
  id,
  token,
}: fetchDeleteParams) {
  return del(`/${teamId}/wines/${id}`, token);
}

// {teamId}/reviews/{id}
export async function fetchDeleteReviewId({
  teamId,
  id,
  token,
}: fetchDeleteParams) {
  return del(`/${teamId}/reviews/${id}`, token);
}

// {teamId}/images/upload
export async function fetchUploadImage({
  teamId,
  token,
  file,
}: fetchUploadImageParams) {
  const formData = new FormData();
  formData.append('image', file);

  return post(`/${teamId}/images/upload`, formData, token);
}
