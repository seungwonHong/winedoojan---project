export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  reviews: any[];
  reviewCount: number;
  avgRating: number;
  avgRatings: { 1: number; 2: number; 3: number; 4: number; 5: number };
}

export interface Review {
  id: number;
  isLiked: boolean;
  rating: number;
  content: string;
  createdAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: {
    nickname: string;
    image: string | null;
  };
  aroma: string[];
}

export interface tastingNotes {
  value: number;
  flavorKeyword: string;
  minLabel: string;
  maxLabel: string;
}

export interface ReviewHeader {
  item: {
    id: number;
    isLiked: boolean;
    rating: number;
    createdAt: string;
    user: {
      image: string | null;
      nickname: string;
    };
    aroma: string[];
  };
}
