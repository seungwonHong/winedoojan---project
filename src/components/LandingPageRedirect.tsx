'use client';
import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
import React, { useEffect } from "react";

type Props = {};

const LandingPageRedirect = (props: Props) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const redirect = async () => {
            const res = await handleResponseWithAuth(`${BASE_URL}/users/me`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
        }
        redirect();
    },[])

  return null;
};

export default LandingPageRedirect;
