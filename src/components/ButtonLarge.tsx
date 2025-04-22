import Image from 'next/image';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonLargeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc?: string;
  imageAlt?: string;
  buttonType: string;
}

interface ButtonType {
  primary: string;
  socialLogin: string;
}

function ButtonLarge({
  onClick,
  children,
  imageSrc,
  imageAlt,
  buttonType,
  ...rest
}: PropsWithChildren<ButtonLargeProps>) {
  const type: ButtonType = {
    primary: 'bg-garnet text-white',
    socialLogin: 'bg-white text-gray-800',
  };

  const bgColor: string = type[buttonType as keyof ButtonType];

  return (
    <button
      className={`flex items-center justify-center w-full max-w-[400px] h-[50px] ${bgColor} rounded-2xl`}
      onClick={onClick}
      {...rest}
    >
      {imageSrc && (
        <Image
          className="w-6 h-6"
          src={imageSrc}
          alt={imageAlt ?? ''}
          width={24}
        />
      )}
      {children}
    </button>
  );
}

export default ButtonLarge;
