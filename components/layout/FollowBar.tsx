import useUsers from "@/hooks/useUsers";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";

const Followbar = () => {
  const { data, error, isLoading } = useUsers();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="px-6 py-4 hidden lg:block text-white">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-4 hidden lg:block text-white">
        Error loading users.
      </div>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followbar;
