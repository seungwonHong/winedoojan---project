// 리뷰 남기기, 수정하기 모달창 api

import handleResponseWithAuth from '@/utils/handleResponseWithAuth';

export type ReviewBaseData = {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
};

export async function submitReview({
  data,
  wineId,
  accessToken,
  mode,
  existingReviewId,
}: {
  data: ReviewBaseData;
  wineId: number;
  accessToken: string;
  mode: 'create' | 'edit';
  existingReviewId?: number;
}) {
  const dataToSend = mode === 'create' ? { ...data, wineId } : data;

  const url =
    mode === 'create'
      ? 'https://winereview-api.vercel.app/14-2/reviews'
      : `https://winereview-api.vercel.app/14-2/reviews/${existingReviewId}`;

  const method = mode === 'create' ? 'POST' : 'PATCH';

  const response = await handleResponseWithAuth(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(dataToSend),
  });

  return response;
}