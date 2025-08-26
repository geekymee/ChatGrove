import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/Home.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/Login.jsx";
import NotificationsPage from "./pages/Notifications.jsx";
import CallPage from "./pages/VideoCall.jsx";
import ChatPage from "./pages/Chat.jsx";
import ProfileSetupPage from "./pages/Bio.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";


const App = () => {
  
  const{isLoading , authUser} = useAuthUser();

  if(isLoading) return <PageLoader/>;
  const isAuthenticated = Boolean(authUser);
  const isProfileComplete = authUser?.isProfileComplete;
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path = "/" element = {isAuthenticated && isProfileComplete? <HomePage/> : <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"} />}/>
        <Route path = "/signup" element = {isAuthenticated? <Navigate to = "/" /> : <SignUpPage/>}/>
        <Route path = "/login" element = {isAuthenticated? <Navigate to = "/" /> : <LoginPage/>}/>
        <Route path = "/notifications" element = {isAuthenticated? <NotificationsPage/> : <Navigate to = "/login" />}/>
        <Route path = "/call" element = {isAuthenticated? <CallPage/> : <Navigate to = "/login " />}/>
        <Route path = "/chat/:chatId" element = {isAuthenticated? <ChatPage/> : <Navigate to = "/login " />}/>
        <Route path = "/profilesetup" element={ isAuthenticated ? (!isProfileComplete ? (<ProfileSetupPage />) : (  <Navigate to="/" />  )) : (  <Navigate to="/login" /> )}/>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;