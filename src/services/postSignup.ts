interface Props {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default async function postSignup(formData: Props) {
  console.log(formData);
  const response = await fetch(
    "https://winereview-api.vercel.app/14-2/auth/signUp",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("서버 응답 메시지:", errorText);
    throw new Error("회원가입 요청 실패");
  }
  if (response.status === 201) {
    return true;
  }
}
