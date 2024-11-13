
import { useRouter } from "next/navigation";
import React, { useCallback} from "react";
import { IconType } from "react-icons";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth
}) => {
  const router = useRouter();
  const logInModal = useLoginModal()
  const handleClick = useCallback(()=>{
    if(!auth){
      logInModal.onOpen()
    }else if(href){
      router.push(href)
     }
    if(onClick){
      return onClick()
    }
   
  },[router, onClick, href, auth, logInModal])
  return (
    <div
      onClick={handleClick}
      className="flex flex-row items-center text-white"
    >
      <div
        className="relative rounded-full w-14 h-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10
        cursor-pointer lg:hidden"
      >
        <Icon size={28} />
      </div>
      <div
        className="relative hidden lg:flex items-center p-4 gap-4 rounded-full hover:bg-slate-300 
       hover:bg-opacity-10 cursor-pointer"
      >
        <Icon size={24} />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
