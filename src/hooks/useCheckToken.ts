import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

async function useCheckToken(response) {
  const { refreshAccessToken } = useAuthStore();
  const [newAccessToken, setNewAccessToken] = useState();
  const [error, setNewError] = useState();

  if (response.status === 401) {
    const success = await refreshAccessToken();
    if (!success) {
      throw new Error('AccessToken 갱신 실패');
    }
  }

  return { newAccessToken, error };
}

export default useCheckToken;
