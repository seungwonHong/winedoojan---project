import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  loginRequest,
  refreshTokenRequest,
  kakaoLoginRequest,
  handleKakaoCallbackRequest,
  fetchUser,
} from '@/services/auth'; // 분리된 API 함수 import
import { navigate } from '@/utils/navigate';
import { User } from '@/types/schema';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isInitialized: boolean; // 추가: 초기화 상태 플래그
  initializeAuth: () => Promise<void>; // 추가: 초기화 함수
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  // kakao 로그인
  kakaoLogin: () => void;
  handleKakaoCallback: (
    code: string
  ) => Promise<{ success: boolean; message?: string }>;
  getMe: () => Promise<{ success: boolean; message?: string }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isInitialized: false, // 기본값: 초기화되지 않음

      // 초기화 함수 추가
      initializeAuth: async () => {
        // 로컬 스토리지에서 가져온 토큰을 확인하고 유효성 검사
        const currentAccessToken = get().accessToken;
        const currentRefreshToken = get().refreshToken;

        // 토큰이 있으면 사용자 정보 가져오기 시도
        if (currentAccessToken) {
          try {
            const result = await fetchUser(currentAccessToken);
            if (result.success) {
              set({
                isAuthenticated: true,
                user: result.data,
                isInitialized: true,
              });
              return;
            }
          } catch (error) {
            console.log('토큰으로 사용자 정보 가져오기 실패: ', error);
          }
        }

        // 액세스 토큰이 실패했지만 리프레시 토큰이 있다면 갱신 시도
        if (currentRefreshToken) {
          try {
            const refreshed = await get().refreshAccessToken();
            if (refreshed) {
              // 갱신 성공 시 사용자 정보 다시 가져오기
              const userResult = await get().getMe();
              set({
                isAuthenticated: userResult.success,
                isInitialized: true,
              });
              return;
            }
          } catch (error) {
            console.log('리프레시 토큰으로 갱신 실패: ', error);
          }
        }

        // 모든 시도 실패 시 로그아웃 상태로 초기화
        set({
          isAuthenticated: false,
          user: null,
          isInitialized: true,
        });
      },

      // 유저 정보 갱신
      getMe: async () => {
        try {
          const result = await fetchUser(get().accessToken);

          if (result.success) {
            set({
              user: result.data,
            });
            return { success: true };
          } else {
            return { success: false, message: result.message };
          }
        } catch (error) {
          console.error('유저 정보 갱신 에러:', error);
          return {
            success: false,
            message: '유저 정보를 갱신하는 중 오류가 발생했습니다.',
          };
        }
      },
      // login 함수
      login: async (email: string, password: string) => {
        const result = await loginRequest(email, password);
        if (result.success && result.data) {
          const { user, accessToken, refreshToken } = result.data;
          set({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            user,
            isInitialized: true, // 로그인 성공 시 초기화 완료
          });
          return { success: true };
        } else {
          return { success: false, message: result.message };
        }
      },

      // logout 함수
      logout: () => {
        // 로그아웃 시 인증 정보 초기화
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          isInitialized: true, // 로그아웃 상태로 초기화 완료
        });
        // 로그아웃 시 랜딩페이지로 이동
        navigate('/');
      },

      // accessToken 재발급
      refreshAccessToken: async () => {
        const currentRefreshToken = get().refreshToken;
        const result = await refreshTokenRequest(currentRefreshToken);

        if (result.success && result.data?.accessToken) {
          set({ accessToken: result.data.accessToken });
          return true;
        } else {
          console.error('토큰 갱신 에러:', result.error);
          // 토큰 갱신 실패 시 로그아웃
          get().logout();
          return false;
        }
      },
      // kakao 로그인
      kakaoLogin: () => {
        kakaoLoginRequest();
      },
      handleKakaoCallback: async (code: string) => {
        const result = await handleKakaoCallbackRequest(code);
        if (result.success && result.data) {
          const { user, accessToken, refreshToken } = result.data;
          set({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            user,
            isInitialized: true, // 카카오 로그인 성공 시 초기화 완료
          });
          return { success: true };
        } else {
          return { success: false, message: result.message };
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Optional: 하이드레이션이 완료될 때 호출되는 함수 추가
      onRehydrateStorage: () => (state) => {
        // 하이드레이션이 완료되면 isInitialized를 true로 설정
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);
