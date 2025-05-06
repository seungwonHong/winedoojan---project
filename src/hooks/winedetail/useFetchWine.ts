import { useState, useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';
import handleResponseWithAuth from '@/utils/handleResponseWithAuth';

import { Wine } from '../../types/schema';

const useFetchWine = (wineId: string) => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWine = async () => {
    try {
      const token = useAuthStore.getState().accessToken;

      if (!token) {
        setError('Access token이 없습니다.');
        setLoading(false);
        return;
      }

      let res = await handleResponseWithAuth(
        `https://winereview-api.vercel.app/14-2/wines/${wineId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error('와인 정보를 불러오지 못했습니다.');
      }

      const data = await res.json();
      setWine(data);
    } catch (err: any) {
      console.error(err);
      setError('와인 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWine();
  }, [wineId]);

  return { wine, loading, error, refetch: fetchWine };
};

export default useFetchWine;
