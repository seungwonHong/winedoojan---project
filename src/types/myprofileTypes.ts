export interface User {
  id: number;
  nickname: string;
  image: string | null;
  teamId: string;
}

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  type: "Red" | "White" | "Sparkling";
  reviewCount: number;
  recentReview: Review;
  userId: number;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
  avgRatings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  flavors: string[];
  wineId: number;
  teamId: string;
  isLiked: boolean;
  user: User;
  wine: Wine;
}

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
