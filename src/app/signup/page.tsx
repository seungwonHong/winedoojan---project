"use client";
import Image from "next/image";
import images from "../../../public/images/images";
import icons from "../../../public/icons/icons";
import Input from "@/components/common/Input";
import Link from "next/link";
import BlobButton from "@/components/common/BlobButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import postSignup from "@/services/postSignup";

interface FormData {
  email: string;
  password: string;
  nickName: string;
  passwordConfirm: string;
}

interface FormError {
  email?: string;
  password?: string;
  nickName?: string;
  passwordConfirm?: string;
}

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    nickName: "",
    passwordConfirm: "",
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

    // 폼 입력 검증
    if (!formData.email) {
      newErrors.email = "이메일은 필수 입력입니다.";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      newErrors.email = "이메일 형식으로 작성해 주세요.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호는 필수 입력입니다.";
    } else if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(formData.password)) {
      newErrors.password = "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상입니다.";
    }
    if (!formData.nickName) {
      newErrors.nickName = "닉네임은 필수 입력입니다.";
    }
    if (formData.nickName.length > 20) {
      newErrors.nickName = "닉네임은 최대 20자까지 가능합니다.";
    }
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인은 필수 입력입니다.";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 입력값이 모두 정상일 때 동작하는 로직
    try {
      setIsLoading(true);

      const res = await postSignup({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickName,
        passwordConfirmation: formData.passwordConfirm,
      });

      if (res) {
        // 회원가입 성공 시 로그인 화면으로 이동
        router.push("/signin");
      } else {
        // 회원가입 실패 시 에러 메시지 표시
        setErrors({
          email: "폼을 다시 확인해주세요.",
        });
      }
    } catch (error) {
      setErrors({
        email: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100">
      <div className="w-fit h-fit px-12 py-20 mx-auto max-lg:my-20 rounded-2xl border border-gray-300 shadow-custom bg-white">
        <div className="flex flex-col justify-center w-[400px] max-md:w-[300px]">
          <div className="flex w-full justify-center mb-16">
            <Link href="/">
              <Image
                src={images.logoGarnet}
                alt="logo"
                width={200}
                height={104}
              />
            </Link>
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
              <Input
                name="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                error={errors.passwordConfirm}
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