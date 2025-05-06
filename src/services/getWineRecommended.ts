import { Wine } from '@/types/schema';

export interface WineRecommended {
  wines: Wine[];
}

interface Props {
  limit: number;
}

export default async function getWineRecommended({
  limit,
}: Props): Promise<WineRecommended> {
  const response = await fetch(
    `https://winereview-api.vercel.app/14-2/wines/recommended?limit=${limit}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  const wines = (await response.json()) as WineRecommended['wines'];
  return { wines };
}
