import { Wine } from '@/types/schema';

interface Props {
  limit: number;
  cursor?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export interface WineResponse {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

export default async function getWine({
  limit,
  cursor,
  type,
  minPrice,
  maxPrice,
  rating,
  name,
}: Props): Promise<WineResponse> {
  const params = new URLSearchParams();
  if (limit !== undefined) params.append('limit', String(limit));
  if (cursor !== undefined) params.append('cursor', String(cursor));
  if (type !== undefined) params.append('type', type);
  if (minPrice !== undefined) params.append('minPrice', String(minPrice));
  if (maxPrice !== undefined) params.append('maxPrice', String(maxPrice));
  if (rating !== undefined) params.append('rating', String(rating));
  if (name !== undefined) params.append('name', name);
  console.log(params);

  const response = await fetch(
    `https://winereview-api.vercel.app/14-2/wines?${params.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  const data = (await response.json()) as WineResponse;
  const wines = data;

  return wines;
}
