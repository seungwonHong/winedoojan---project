'use client';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function KakaoCallbackPage() {
  const router = useRouter();
  const { handleKakaoCallback } = useAuthStore();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      handleKakaoCallback(code).then(({ success, message }) => {
        if (success) {
          router.push('/wines');
        } else {
          console.log(message);
          router.push('/signin?error=로그인 실패');
        }
      });
    } else {
      router.push('/login?error=인가코드를 받지 못했습니다');
    }
  }, [router, handleKakaoCallback]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">
        카카오 로그인 처리 중...
      </p>
      <p className="mt-2 text-sm text-gray-500">잠시만 기다려 주세요</p>
    </div>
  );
}

export default KakaoCallbackPage;
