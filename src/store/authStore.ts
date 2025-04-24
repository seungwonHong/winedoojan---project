import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,

      // register 함수
      register: async (
        email: string,
        nickname: string,
        password: string,
        passwordConfirmation: string
      ) => {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nickname,
              email,
              password,
              passwordConfirmation,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            return {
              success: false,
              message: errorData.message || '회원가입에 실패했습니다.',
            };
          }

          const data = await res.json();
          const { user, accessToken, refreshToken } = data;

          // 회원가입 시 자동 로그인 처리
          if (accessToken && refreshToken) {
            set({
              isAuthenticated: true,
              accessToken,
              refreshToken,
              user,
            });
            return {
              success: true,
              message:
                data.message || '회원가입이 완료되었습니다. 로그인해주세요.',
            };
          } else {
            return {
              success: false,
              message: '인증 정보를 받지 못했습니다.',
            };
          }
        } catch (error) {
          console.error('회원가입 에러:', error);
          return {
            success: false,
            message: '회원가입 요청 중 오류가 발생했습니다.',
          };
        }
      },

      // login 함수
      login: async (email: string, password: string) => {
        try {
          // Swagger 문서 로그인 엔드포인트 호출
          const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            return {
              success: false,
              message: errorData.message || '로그인에 실패했습니다.',
            };
          }

          const data = await response.json();
          const { user, accessToken, refreshToken } = data;

          if (accessToken && refreshToken) {
            set({
              isAuthenticated: true,
              accessToken,
              refreshToken,
              user,
            });

            return { success: true };
          } else {
            return {
              success: false,
              message: '인증 정보를 받지 못했습니다.',
            };
          }
        } catch (error) {
          console.error('로그인 에러:', error);
          return {
            success: false,
            message: '로그인 요청 중 오류가 발생했습니다.',
          };
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
        });
      },

      // accessToken 재발급
      refreshAccessToken: async () => {
        try {
          const currentRefreshToken = get().refreshToken;

          if (!currentRefreshToken) {
            return false;
          }

          // 토큰 갱신 엔드포인트 호출
          const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: currentRefreshToken }),
          });

          if (!response.ok) {
            throw new Error('토큰 갱신 실패');
          }

          const data = await response.json();
          const { accessToken } = data;

          set({
            accessToken,
          });

          return true;
        } catch (error) {
          console.error('토큰 갱신 에러:', error);

          // 토큰 갱신 실패 시 로그아웃
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      // refreshToken은 사용자의 로컬 스토리지에 저장
      storage: createJSONStorage(() => localStorage),
    }
  )
);
