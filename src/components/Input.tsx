import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, type, placeholder, onChange, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="font-medium text-base leading-[26px] ">{label}</label>
      <input
        className="w-fill h-12 rounded-2xl px-[20px] py-[14px] border border-gray-300 focus:outline-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default Input;
