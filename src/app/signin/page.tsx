import Image from 'next/image';
import images from '../../../public/images/images';
import icons from '../../../public/icons/icons';
import Input from '@/components/Input';
import Link from 'next/link';
import BlobButton from '@/components/BlobButton';

function Signin() {
  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center w-fit h-fit px-12 py-20 mx-auto rounded-2xl border border-gray-300 shadow-custom bg-white">
        <div className="flex w-full justify-center mb-16">
          <Image src={images.logoGarnet} alt="logo" width={200} height={104} />
        </div>
        <form className="flex flex-col gap-[25px]">
          <Input label="이메일" placeholder="이메일 입력" />
          <Input label="비밀번호" placeholder="비밀번호 입력" />
        </form>
        <Link className="text-garnet mt-[10px] mb-[56px]" href="/signup">
          비밀번호를 잊으셨나요?
        </Link>
        <div className="flex flex-col gap-4">
          <BlobButton>가입하기</BlobButton>
          <BlobButton
            buttonColor="#000"
            fontColor="#000"
            imageSrc={icons.googleIcon}
            imageAlt="google"
          >
            Google로 시작하기
          </BlobButton>
          <BlobButton
            buttonColor="#F3DC00"
            fontColor="#000"
            hoverFontColor="#000"
            imageSrc={icons.kakaoIcon}
            imageAlt="kakao"
          >
            kakao로 시작하기
          </BlobButton>
        </div>
        <div>
          <span>
            계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
