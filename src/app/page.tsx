import { useAuthStore } from '@/store/authStore';

export default function Home() {
  // 로그인 인증 확인
  const { isAuthenticated, user } = useAuthStore();
  const { accessToken, refreshToken } = useAuthStore.getState();

  console.log(
    '🚀 ~ ProfilePage ~ isAuthenticated, user:',
    isAuthenticated,
    user
  );
  console.log('accessToken:', accessToken, 'refreshToken', refreshToken);

  return (
    <div className="">
      <h1 className="text-4xl text-garnet">와인두잔</h1>
    </div>
  );
}
