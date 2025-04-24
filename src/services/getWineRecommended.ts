export interface WineRecommended {
  wines: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: "RED" | "WHITE" | "SPARKLING";
    avgRating: number;
    reviewCount: number;
    recentReview: {
      user: {
        id: number;
        nickname: string;
        image: string;
      };
      updatedAt: string;
      createdAt: string;
      content: string;
      aroma: string[];
      rating: number;
      id: number;
    };
    userId: number;
  }[];
}

interface Props {
  limit: number;
}

export default async function getWineRecommended({ limit }: Props): Promise<WineRecommended> {
  const response = await fetch(
    `https://winereview-api.vercel.app/14-2/wines/recommended?limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const wines = await response.json() as WineRecommended['wines'];
  return { wines };
}
