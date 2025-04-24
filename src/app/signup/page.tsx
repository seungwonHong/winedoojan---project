"use client";
import Image from "next/image";
import images from "../../../public/images/images";
import icons from "../../../public/icons/icons";
import Input from "@/components/common/Input";
import Link from "next/link";
import BlobButton from "@/components/common/BlobButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  nickName: string;
}

interface FormError {
  email?: string;
  password?: string;
  nickName?: string;
}

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    nickName: "",
  });
  const [errors, setErrors] = useState<FormError>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 입력 시 해당 필드의 에러 메시지 초기화
    if (errors[name as keyof FormError]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일은 필수 입력입니다.";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      newErrors.email = "이메일 형식으로 작성해 주세요.";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호는 필수 입력입니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const isLoginSuccessful =
        formData.email === "test@example.com" &&
        formData.password === "password123";

      if (isLoginSuccessful) {
        // 회원가입 성공 시 로그인 화면으로 이동
        router.push("/signin");
      } else {
        // 회원가입 실패 시 에러 메시지 표시
        setErrors({
          email: "이메일 혹은 비밀번호를 확인해주세요.",
        });
      }
    } catch (error) {
      setErrors({
        email: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100">
      <div className="w-fit h-fit px-12 py-20 mx-auto max-lg:my-20 rounded-2xl border border-gray-300 shadow-custom bg-white">
        <div className="flex flex-col justify-center w-[400px] max-md:w-[300px]">
          <div className="flex w-full justify-center mb-16">
            <Image
              src={images.logoGarnet}
              alt="logo"
              width={200}
              height={104}
            />
          </div>
          <form className="flex flex-col mb-[15px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[25px]">
              <Input
                name="email"
                type="email"
                label="이메일"
                placeholder="이메일 입력"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Input
                name="nickName"
                type="text"
                label="닉네임"
                placeholder="닉네임 입력"
                value={formData.nickName}
                onChange={handleInputChange}
                error={errors.nickName}
              />
              <Input
                name="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </div>

            <div className="mt-[32px]">
              <BlobButton type="submit" disabled={isLoading}>
                {isLoading ? "가입 중..." : "가입하기"}
              </BlobButton>
            </div>
          </form>

          <div className="flex items-center justify-center mt-8 text-base">
            <span className="text-gray-500">
              계정이 이미 있으신가요?{" "}
              <Link
                className="text-garnet underline font-medium"
                href="/signin"
              >
                로그인하기
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
