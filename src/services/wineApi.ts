// 와인 등록(수정)하기 모달창 api

import handleResponseWithAuth from '@/utils/handleResponseWithAuth';

export async function uploadWineImage(file: File, accessToken: string): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('https://winereview-api.vercel.app/14-2/images/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

export async function submitWineData({
  mode,
  accessToken,
  winePayload,
  wineId,
}: {
  mode: 'create' | 'edit';
  accessToken: string;
  winePayload: any;
  wineId?: number;
}) {
  const url =
    mode === 'create'
      ? 'https://winereview-api.vercel.app/14-2/wines'
      : `https://winereview-api.vercel.app/14-2/wines/${wineId}`;

  const method = mode === 'create' ? 'POST' : 'PATCH';

  const response = await handleResponseWithAuth(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(winePayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return await response.json();
}