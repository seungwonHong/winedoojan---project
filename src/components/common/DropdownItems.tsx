interface DropdownProps {
  isOpen: boolean;
  labels: string[];
  actions: Record<string, () => void>;
}

function DropdownItems({ isOpen, labels, actions }: DropdownProps) {
  return (
    <>
      {isOpen && (
        <ul className="absolute right-0 flex flex-col mt-2 bg-white border border-gray-300 rounded-2xl z-10">
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
