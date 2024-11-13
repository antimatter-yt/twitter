"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Button from "../Button";
import {BiCalendar} from 'react-icons/bi'

interface User {
  bio?: string;
  createdAt: Date;
}

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [data, setData] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Ensure userId is defined
        try {
          const response = await axios.get(`/api/user/${userId}`);
          setData(response.data.existingUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [userId]);
  const createAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return format(new Date(data?.createdAt), "MMMM yyyy");
  }, [data?.createdAt]);
  if (data) {
    return (
      <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
            {
                user ? (
                    <Button secondary label="Edit" onClick={()=>{}} />
                ) : (
                    <Button secondary label="Follow" onClick={()=>{}} />
                )
            }
        </div>
        <div className="mt-8 px-4">
            <div className="flex flex-col">
                <p className="text-white text-2xl font-semibold">
                    @{data?.name}
                </p>
                <p className="text-md text-neutral-500">
                    {data?.username}
                </p>
            </div>
            <div className="flex flex-col mt-4">
                <p className="text-white">{data?.bio}</p>
                <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                    <BiCalendar size={24}/>
                    <p>joined  {createAt}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mt-4 gap-6">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">{data?.followingIds?.length}</p>
                    <p className="text-neutral-500">Following</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">{data?.followersCount?.length || 0}</p>
                    <p className="text-neutral-500">Followers</p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return null; // Render nothing or a loading state if data is not yet available
};

export default UserBio;
