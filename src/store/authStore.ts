import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  loginRequest,
  refreshTokenRequest,
  kakaoLoginRequest,
  handleKakaoCallbackRequest,
} from "@/services/auth"; // 분리된 API 함수 import


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
  // kakao 로그인
  kakaoLogin: () => void;
  handleKakaoCallback: (
    code: string
  ) => Promise<{ success: boolean; message?: string }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,

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
        });
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
          });
          return { success: true };
        } else {
          return { success: false, message: result.message };
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
