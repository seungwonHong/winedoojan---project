import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

/**
 * 인증이 필요한 페이지에서 사용하는 커스텀 훅
 * @param {string} redirectPath - 인증되지 않은 경우 리다이렉트할 경로 (기본값: '/signin')
 * @returns {boolean} isLoading - 초기화 중인지 여부
 */
export function useAuthProtection(redirectPath = '/signin') {
  const router = useRouter();
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();

  // 컴포넌트 마운트 시 인증 상태 초기화
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // 초기화가 완료되고 인증되지 않았을 때 리다이렉트
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, isInitialized, router, redirectPath]);

  // 로딩 상태 반환 (초기화 중이면 true)
  return !isInitialized;
}
