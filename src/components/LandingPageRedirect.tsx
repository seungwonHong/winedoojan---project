"use client";
import { useAuthStore } from "@/store/authStore";
import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const LandingPageRedirect = (props: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { getMe } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await getMe();

      if (result.success) {
        router.push("/wines");
      } else {
        router.push("/");
      }
    };
    checkAuth().finally(() => setIsLoading(false));
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed bg-white z-50 w-screen h-screen flex flex-col items-center justify-center">
      <img
        src="/images/winegif.gif"
        alt="gif"
        className="lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[150px] h-[150px]"
      />
      <span className="lg:text-[24px] md:text-[20px] text-[16px] font-bold text-burgundy mt-[30px]">
        로딩 중 ...
      </span>
    </div>
  );
};

export default LandingPageRedirect;
