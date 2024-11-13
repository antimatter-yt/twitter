"use client";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onToggle = useCallback(()=>{
    if(isLoading){
        return
    }
    registerModal.onClose();
    loginModal.onOpen()
    
},[isLoading, registerModal, loginModal])
const onSubmit = useCallback(async () => {
  try {
        setIsLoading(true);
        await axios.post('/api/register',{
          email, name, username, password
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        toast.success("account created")
        registerModal.onClose();
        signIn('credentials', {email, password})
      
    } catch (error) {
      console.log(error);
      toast.error('something went wrong')
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, username, password, name]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        placeholder="Username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
        <p>Already have an account? 
            <span
            onClick={onToggle}
            className="text-white cursor-pointer hover:underline ml-2"
            >
                Sign in
            </span>
        </p>
    </div>
  )
  return(
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Create Account"
    actionLabel="Register"
    onClose={registerModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  );
};

export default RegisterModal;
