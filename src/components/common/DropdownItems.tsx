import { useEffect, useRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  labels: string[];
  actions: Record<string, () => void>;
  setIsOpen?: (open: boolean) => void;
  positionTop?: string;
}

function DropdownItems({ isOpen, labels, actions, setIsOpen, positionTop = "0px" }: DropdownProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if(setIsOpen){
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  
  return (
    <>
      {isOpen && (
        <ul ref={dropdownRef} className={`absolute right-0 flex flex-col mt-2 bg-white border border-gray-300 rounded-2xl z-10  top-[${positionTop}]`}>
          {labels.map((label) => (
            <li
              key={label}
              className="m-[6px] px-4 py-2 bg-white rounded-2xl hover:bg-[#F3E7E6] hover:text-garnet cursor-pointer whitespace-nowrap text-center"
              onClick={actions[label]}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default DropdownItems;
