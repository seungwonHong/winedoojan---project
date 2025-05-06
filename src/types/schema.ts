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
  type: 'Red' | 'White' | 'Sparkling';
  reviewCount: number;
  recentReview: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
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
  user: User;
  wine: Wine;
}
