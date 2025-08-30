import { X , VideoIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser,
    setSelectedUser,
    showVideoCallPopup,
  } = useChatStore();
  const {onlineUsers} = useAuthStore();

  const handleVideoCall = () =>{
    showVideoCallPopup(selectedUser);
  }
  if (!selectedUser) return null;
  console.log("selected user : ", selectedUser)
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {/* Right side - action buttons */}
        <div className="flex items-center gap-2">
          {/* video call  */}
          <button onClick={handleVideoCall} className="sm:flex btn btn-circle">
            <VideoIcon/>
          </button>
          {/* Close button */}
          <button onClick={() => setSelectedUser(null)} className="sm:flex btn btn-circle">
            <X />
          </button>
        </div>
        
      </div>
    </div>
  );
};
export default ChatHeader;