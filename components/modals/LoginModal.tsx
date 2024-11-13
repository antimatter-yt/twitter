"use client";
import React, { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import {toast} from 'react-hot-toast'

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onToggle = useCallback(()=>{
    if(isLoading){
      return
    }
    loginModal.onClose()
    registerModal.onOpen();
    
  },[isLoading, registerModal, loginModal])
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await signIn('credentials',{
        email, password
      })
      console.log(response)
      toast.success("successfully login")
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, setIsLoading, email, password, ]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        placeholder="Password"
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
        <p>First time using twitter? 
            <span
            onClick={onToggle}
            className="text-white cursor-pointer hover:underline ml-2"
            >
                Create Account
            </span>
        </p>
    </div>
  )
  return(
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  );
};

export default LoginModal;
