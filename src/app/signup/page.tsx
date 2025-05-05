"use client";
import Image from "next/image";
import images from "../../../public/images/images";
import Input from "@/components/common/Input";
import Link from "next/link";
import BlobButton from "@/components/common/BlobButton";
import { useRouter } from "next/navigation";
import postSignup from "@/services/postSignup";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const signupSchema = z
    .object({
      email: z
        .string()
        .nonempty({ message: "이메일은 필수 입력입니다." })
        .email({ message: "이메일 형식으로 작성해 주세요." }),
      nickName: z
        .string()
        .nonempty({ message: "닉네임은 필수 입력입니다." })
        .max(20, { message: "닉네임은 최대 20자까지 가능합니다." }),
      password: z
        .string()
        .nonempty({ message: "비밀번호는 필수 입력입니다." })
        .min(8, { message: "비밀번호는 최소 8자 이상입니다." })
        .regex(/^[A-Za-z0-9!@#$%^&*]+$/, {
          message: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
        }),
      passwordConfirm: z
        .string()
        .nonempty({ message: "비밀번호 확인은 필수 입력입니다." }),
    })
    .superRefine((data, context) => {
      if (data.password !== data.passwordConfirm) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치하지 않습니다",
          path: ["passwordConfirm"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      const response = await postSignup({
        email: data.email,
        nickname: data.nickName,
        password: data.password,
        passwordConfirmation: data.passwordConfirm,
      });

      if (response) {
        router.push("/signin");
      }
    } catch (error) {
      alert("아이디가 이미 존재합니다.");
    }
  };

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
              />
            </Link>
          </div>
          <form
            className="flex flex-col mb-[15px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-[25px]">
              <Input
                type="email"
                label="이메일"
                placeholder="이메일 입력"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                type="text"
                label="닉네임"
                placeholder="닉네임 입력"
                {...register("nickName")}
                error={errors.nickName?.message}
              />
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                {...register("password")}
                error={errors.password?.message}
              />
              <Input
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                {...register("passwordConfirm")}
                error={errors.passwordConfirm?.message}
              />
            </div>

            <div className="mt-[32px]">
              <BlobButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "가입 중..." : "가입하기"}
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
