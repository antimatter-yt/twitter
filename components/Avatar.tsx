import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
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
  const onClick = useCallback(() => {
    const url = `users/${userId}`;
    router.push(url);
  }, [router, userId]);
  console.log(data)
  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90
        transition 
        cursor-pointer
        relative
        `}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="avatar"
        sizes="80"
        onClick={onClick}
        src={data?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
