import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="relative flex flex-col gap-[10px]">
      <label className="font-medium text-base leading-[26px] ">{label}</label>
      <input
        className="w-fill h-12 rounded-2xl px-[20px] py-[14px] border border-gray-300 focus:outline-none"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input;
