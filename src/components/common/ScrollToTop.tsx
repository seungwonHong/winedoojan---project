'use client';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 스크롤 위치에 따라 버튼 표시
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 맨위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-garnet text-white shadow-lg hover:bg-ruby transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
          aria-label="맨 위로 스크롤"
        >
          <MdOutlineKeyboardArrowUp size={40} />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
