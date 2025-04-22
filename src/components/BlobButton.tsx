'use client';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './BlobButton.module.css'; // CSS Module import
import Image from 'next/image';

interface BlobButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  buttonColor?: string;
  fontColor?: string;
  hoverFontColor?: string;
  imageSrc?: string;
  imageAlt?: string;
}

function BlobButton({
  children,
  onClick,
  imageSrc,
  imageAlt,
  buttonColor = '#830e0d', // 기본 색상 설정
  fontColor = '#830e0d',
  hoverFontColor = '#fff',
}: BlobButtonProps) {
  const buttonStyles = {
    '--fontColor': fontColor,
    '--hoverFontColor': hoverFontColor,
    '--buttonColor': buttonColor,
  } as React.CSSProperties;

  return (
    <div className={styles.buttons}>
      <button className={styles.blobBtn} onClick={onClick} style={buttonStyles}>
        {imageSrc && (
          <Image
            className="w-6 h-6"
            src={imageSrc}
            alt={imageAlt ?? ''}
            width={24}
            height={24}
          />
        )}
        {children}
        <span className={styles.blobBtn__inner}>
          <span className={styles.blobBtn__blobs}>
            <span className={styles.blobBtn__blob}></span>
            <span className={styles.blobBtn__blob}></span>
            <span className={styles.blobBtn__blob}></span>
            <span className={styles.blobBtn__blob}></span>
          </span>
        </span>
      </button>
      <br />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default BlobButton;
