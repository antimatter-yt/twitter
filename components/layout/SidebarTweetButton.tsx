import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useCurrentUser from "@/hooks/uesCurrentUser";
import {toast} from 'react-hot-toast'

const SidebarTweetButton = () => {
  const user = useCurrentUser()
  const loginModal = useLoginModal()
  const onClick = useCallback(()=>{
    if(!user.data){
      loginModal.onOpen()
    }else{
      toast.success("already log in")
    }
  },[loginModal, user])
  return (
    <div onClick={onClick} >
        <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center 
      justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white"/>
        </div>
        <div className="mt-6 hidden lg:block rounded-full px-4 py-2 bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className="hidden lg:block text-center text-white font-semibold text-[20px]">Tweet</p>
        </div>
    </div>
  );
};

export default SidebarTweetButton;
