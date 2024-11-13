"use client"
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}
const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleSubmit = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleSubmit}
            size={20}
            className="cursor-pointer hover:opacity-70 transition text-white"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
