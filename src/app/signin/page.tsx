'use client';
import Image from 'next/image';
import images from '../../../public/images/images';
import icons from '../../../public/icons/icons';
import Input from '@/components/common/Input';
import Link from 'next/link';
import BlobButton from '@/components/common/BlobButton';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

function Signin() {
  const { login, kakaoLogin, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const signinSchema = z.object({
    email: z
      .string()
      .nonempty({ message: '이메일은 필수 입력입니다.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
    password: z.string().nonempty({ message: '비밀번호는 필수 입력입니다.' }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });

  // login 시도
  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      const response = await login(data.email, data.password);

      if (response.success) {
        // 성공시 와인 목록으로 이동
        router.push('/wines');
      } else {
        setError('email', {
          type: 'manual',
          message: response.message,
        });
      }
    } catch (error) {
      console.log(error);
      setError('email', {
        type: 'manual',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  };

  useEffect(() => {
    // 이미 로그인 상태시 와인 목록으로 이동
    if (isAuthenticated) {
      router.push('/wines');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100">
      <div className="w-fit h-fit px-12 py-20 mx-auto max-lg:my-20 rounded-2xl border border-gray-300 shadow-custom bg-white">
        <div className="flex flex-col justify-center w-[400px] max-md:w-[300px]">
          <div className="flex w-full justify-center mb-16">
            <Link href="/">
              <Image
                className="w-auto h-auto"
                src={images.logoGarnet}
                alt="logo"
                width={200}
                height={104}
                priority={true}
              />
            </Link>
          </div>
          <form
            className="flex flex-col mb-[15px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-[25px] mb-[56px]">
              <Input
                type="email"
                label="이메일"
                placeholder="이메일 입력"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <BlobButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </BlobButton>
          </form>
          <div className="flex flex-col gap-4">
            <BlobButton
              buttonColor="#F3DC00"
              fontColor="#000"
              hoverFontColor="#000"
              imageSrc={icons.kakaoIcon}
              imageAlt="kakao"
              onClick={kakaoLogin}
            >
              Kakao로 시작하기
            </BlobButton>
          </div>
          <div className="flex items-center justify-center mt-8 text-base">
            <span className="text-gray-500">
              계정이 없으신가요?{' '}
              <Link
                className="text-garnet underline font-medium"
                href="/signup"
              >
                회원가입하기
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
