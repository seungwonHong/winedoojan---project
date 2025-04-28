const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API = process.env.NEXT_PUBLIC_KAKAO_API;

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // const errorData = await response.json();
      return {
        success: false,
        message: '이메일 혹은 비밀번호를 확인해주세요.',
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('로그인 에러:', error);
    return {
      success: false,
      message: '로그인 요청 중 오류가 발생했습니다.',
    };
  }
};

export const refreshTokenRequest = async (refreshToken: string | null) => {
  try {
    if (!refreshToken) {
      return { success: false };
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('토큰 갱신 실패');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('토큰 갱신 에러:', error);
    return { success: false, error };
  }
};

export const kakaoLoginRequest = () => {
  const redirectUri = `${BASE_URL}/oauth/signup/kakao`; // 카카오 개발자 콘솔에 등록한 URI
  const responseType = 'code';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API}&redirect_uri=${redirectUri}&response_type=${responseType}`;
  window.location.href = kakaoAuthUrl;
};

export const handleKakaoCallbackRequest = async (code: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin/KAKAO`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token: code,
        redirectUri: `${BASE_URL}/oauth/signup/kakao`,
        state: '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message + ' 카카오 로그인에 실패했습니다.',
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log('카카오 로그인 에러:', error);
    return {
      success: false,
      message: '카카오 로그인 처리 중 오류가 발생했습니다.',
    };
  }
};
