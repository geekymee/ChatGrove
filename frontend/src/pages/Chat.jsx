import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import FriendList from "../components/FriendList.jsx";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { getUserFriends } from "../lib/api.js";
import { useNavigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";
const ChatPage = () => {
  const { selectedUser, setSelectedUser , clearSelectedUser} = useChatStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  useEffect(() => {
    if (!loadingFriends) {
      if (id) {
        const user = friends.find((f) => f._id === id);
        if (user) {
          setSelectedUser(user);
        } else {
          clearSelectedUser(); // fallback if invalid ID
        }
      } else {
        clearSelectedUser();
      }
    }
  }, [id, friends, loadingFriends, setSelectedUser, clearSelectedUser]);
  useEffect(() => {
    if (selectedUser?._id) {
      navigate(`/chats/${selectedUser._id}`, { replace: true });
    } else {
      navigate(`/chats`, { replace: true });
    }
  }, [selectedUser, navigate]);

  return (
    <div className="fixed inset-0 h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <FriendList />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;