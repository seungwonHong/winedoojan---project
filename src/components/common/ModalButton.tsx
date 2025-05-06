import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  rounded?: string;
  className?: string; // 추가 커스터마이징용
};

export default function ModalButton({
  children,
  onClick,
  width = 'w-[154px]',
  height = 'h-[54px]',
  bgColor = 'bg-[#800020]',
  textColor = 'text-white',
  fontSize = 'text-base',
  fontWeight = 'font-bold',
  rounded = 'rounded-xl',
  className = '',
}: Props) {
  const buttonClass = [
    width,
    height,
    bgColor,
    textColor,
    fontSize,
    fontWeight,
    rounded,
    'px-4 py-2',
    className,
  ].join(' ');

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
