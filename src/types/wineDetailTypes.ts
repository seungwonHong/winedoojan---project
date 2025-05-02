export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review;
  userId: number;
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
  wineId: number;
  teamId: string;
  isLiked: boolean;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
}

export interface tastingNotes {
  value: number;
  flavorKeyword: string;
  minLabel: string;
  maxLabel: string;
}

export interface WineDetailReviewCardListProps {
  wine: Wine;
  refetch: () => Promise<void>;
}

export interface ReviewListFilterProps {
  reviews: Review[];
  onSort: (reviews: Review[]) => void;
}
