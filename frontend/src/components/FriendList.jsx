import { useEffect, useState } from "react";
import FriendListSkeleton from "./skeletons/FriendListSkeleton";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const FriendList = () => {
  const {onlineUsers} = useAuthStore();
  const {getUsers , users , selectedUser , setSelectedUser, isUsersLoading} = useChatStore();
  useEffect(() => {
    getUsers();},
  [getUsers]);

  if (isUsersLoading) {
    return <FriendListSkeleton />;
  }
  
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Your Friends</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 text-sm text-base-content/70">
              <Users className="size-12 mb-2" />
              No friends yet. Start by adding some friends!
            </div>
          ) : (
            users.map((user) => (

              <button
                key={user._id}
                onClick={() => {setSelectedUser(user); 
                  
                }}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                      rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>
                
                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
    </aside>
  );
};
export default FriendList;