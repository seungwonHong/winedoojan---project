import Image from 'next/image';
import LogoGarnet from '../../../public/images/logo-garnet.png';
import ButtonLarge from '@/components/ButtonLarge';
import Input from '@/components/Input';
import Link from 'next/link';

function Signin() {
  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center w-fit h-fit px-12 py-20 mx-auto rounded-2xl border border-gray-300 shadow-custom bg-white">
        <div className="flex w-full justify-center mb-16">
          <Image src={LogoGarnet} alt="logo" width={200} />
        </div>
        <form className="flex flex-col gap-[25px]">
          <Input label="이메일" placeholder="이메일 입력" />
          <Input label="비밀번호" placeholder="비밀번호 입력" />
        </form>
        <Link className="text-garnet mt-[10px] mb-[56px]" href="/signup">
          비밀번호를 잊으셨나요?
        </Link>
        <ButtonLarge buttonType="primary">가입하기</ButtonLarge>
        <ButtonLarge buttonType="socialLogin">가입하기</ButtonLarge>
        <ButtonLarge buttonType="socialLogin">가입하기</ButtonLarge>
      </div>
    </div>
  );
}

export default Signin;
