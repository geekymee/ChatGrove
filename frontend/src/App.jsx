import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/Home.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/Login.jsx";
import NotificationsPage from "./pages/Notifications.jsx";
import CallPage from "./pages/VideoCall.jsx";
import ChatPage from "./pages/Chat.jsx";
import OnboardingPage from "./pages/Bio.jsx";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";


const App = () => {
  
  const {data: authData , isLoading , error} =useQuery({
    queryKey: ['authUser'],
    queryFn: async ()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry : false, 
  });
  const authUser = authData?.user || null;
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path = "/" element = {authUser? <HomePage/> : <Navigate to = "/login" />}/>
        <Route path = "/signup" element = {authUser? <Navigate to = "/" /> : <SignUpPage/>}/>
        <Route path = "/login" element = {authUser? <Navigate to = "/" /> : <LoginPage/>}/>
        <Route path = "/notifications" element = {authUser? <NotificationsPage/> : <Navigate to = "/login" />}/>
        <Route path = "/call" element = {authUser? <CallPage/> : <Navigate to = "/login " />}/>
        <Route path = "/chat/:chatId" element = {authUser? <ChatPage/> : <Navigate to = "/login " />}/>
        <Route path = "/onboarding" element = {authUser? <OnboardingPage/> : <Navigate to = "/login " />}/>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;