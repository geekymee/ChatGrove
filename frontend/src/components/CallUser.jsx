import { useEffect, useState } from "react";
import { PhoneCallIcon } from "lucide-react"
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import { useParams } from "react-router";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const CallUser = ({ reciever }) => {
    const { closeVideoCallPopup, sendMessage } = useChatStore();
    const { authUser } = useAuthStore();

    const { id: targetUserId } = useParams();
    console.log("targetUserId" ,targetUserId)

    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true)

    const { data: tokenData } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser,
    });
    console.log(tokenData?.token);
    useEffect(() => {
        const initChat = async () => {
            if (!tokenData?.token || !authUser) return;

            try {
                console.log("Initializing stream chat client...");

                const client = StreamChat.getInstance(STREAM_API_KEY);

                await client.connectUser(
                    {
                        id: authUser._id,
                        name: authUser.fullName,
                        image: authUser.profilePic,
                    },
                    tokenData.token
                );

                const channelId = [authUser._id, targetUserId].sort().join("-");

                const currChannel = client.channel("messaging", channelId, {
                    members: [authUser._id, targetUserId],
                });

                await currChannel.watch();

                setChatClient(client);
                setChannel(currChannel);
            } catch (error) {
                console.error("Error initializing chat:", error);
                toast.error("Could not connect to chat. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        initChat();
    }, [tokenData, authUser, targetUserId]);

    const handleVideoCall = async () => {
        if (!channel) return;
        closeVideoCallPopup()
        const callUrl = `${window.location.origin}/call/${channel.id}`;
        console.log(callUrl)
        try {
            const messageText = `Click here to join the call: ${callUrl}`;
            await sendMessage({ text: messageText });
            toast.success("Video call link sent sucessfully!");
        } catch (err) {
          console.error("Failed to send video call link:", err);
          toast.error("Failed to send video call link.");
        }
    };


    return (
        <div className="card bg-base-200 hover:shadow-lg transition-shadow">
            <div className="card-body p-4">
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold truncate">Video call</h3>
                    <img
                        src={reciever.profilePic}
                        alt="profile pic"
                        className="w-20 h-20 rounded-full border-4 border-blue-500"
                    />
                    <h3 className="font-semibold truncate">{reciever.fullName}</h3>
                    <p className="font-light truncate">{reciever.bio}</p>

                    <div className="flex gap-4 mt-5">
                        <button
                            onClick={handleVideoCall}// function that handles media and calling
                            className="bg-green-600 text-white px-4 py-1 rounded-lg w-28 flex items-center gap-2 justify-center"
                        >
                            Call <PhoneCallIcon />
                        </button>
                        <button
                            onClick={() => closeVideoCallPopup()}
                            className="bg-gray-400 text-white px-4 py-1 rounded-lg w-28"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallUser