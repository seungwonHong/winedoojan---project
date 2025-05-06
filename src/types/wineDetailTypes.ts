import { Review, Wine } from './schema';

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
