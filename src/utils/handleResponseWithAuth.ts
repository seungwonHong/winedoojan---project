import { useAuthStore } from '@/store/authStore';

type RequestOptions = {
  method: string;
  headers: Record<string, string>;
  body?: BodyInit | null;
};

async function handleResponseWithAuth(
  url: string | URL,
  options: RequestOptions
): Promise<Response> {
  // 현재 토큰이 없으면 헤더에서 Authorization 제거
  const token = useAuthStore.getState().accessToken;
  const headers = { ...options.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (headers.Authorization) {
    // 토큰이 없는데 Authorization 헤더가 있으면 제거
    delete headers.Authorization;
  }

  // 첫 번째 요청 실행
  let response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  // 401 응답인 경우 토큰 갱신 후 재요청
  if (response.status === 401) {
    // 토큰 갱신 시도
    const success = await useAuthStore.getState().refreshAccessToken();
    if (!success) {
      // 사용자에게 로그인 만료 알림을 보여줄 수 있는 에러 발생
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    // 새 토큰 가져오기
    const newToken = useAuthStore.getState().accessToken;

    // 헤더 업데이트
    headers.Authorization = `Bearer ${newToken}`;

    // 재요청 실행
    response = await fetch(url.toString(), {
      ...options,
      headers,
    });
  }

  return response;
}

export default handleResponseWithAuth;
