import { Review, Wine } from './schema';

export interface ReviewsResponse {
  list: Review[];
  totalCount: number;
  nextCursor: number;
}

export interface WinesResponse {
  list: Wine[];
  totalCount: number;
  nextCursor: number;
}

export interface UpdateUserResponse {
  image: string;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  url: string;
  id: number;
}

export interface ErrorResponse {
  message: string;
}
