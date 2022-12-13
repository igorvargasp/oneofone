import { ReactNode } from "react";

export interface InputProps {
  label: string;
  placeholder: string;
  icon: ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, icon }) => {
  return (
    <div className="flex flex-col w-full mb-5">
      <label
        htmlFor="key-icon"
        className="block mb-2 text-lg font-medium  dark:text-white bold text-blue-700 font-roboto "
      >
        {label}
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-blue-700 ">
          {icon}
        </div>
        <input
          type="text"
          id="key-icon"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
