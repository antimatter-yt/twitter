"use client";
import { FaUser } from "react-icons/fa";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/uesCurrentUser";

const Sidebar = () => {
  const user = useCurrentUser()
  const onClick = async () => {
    await signOut()
  }
  const Items = [
    {
      label: "Home",
      href: "/home",
      icon: BsHouseFill,
      auth:user?.data
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth:user?.data
    },
    {
      label: "Profile",
      href: "/profile",
      icon: FaUser,
      auth:user?.data
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6 ">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {Items.map((item) => 
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item.auth}
            />
          )}
      
         {user.data ?  <SidebarItem onClick={onClick} icon={BiLogOut} label="logout" /> : ""}
      <SidebarTweetButton/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
