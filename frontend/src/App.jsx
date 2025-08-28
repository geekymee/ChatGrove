import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import HomePage from "./pages/Home.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/Login.jsx";
import NotificationsPage from "./pages/Notifications.jsx";
import CallPage from "./pages/VideoCall.jsx";
import ChatPage from "./pages/Chat.jsx";
import ProfileSetupPage from "./pages/Bio.jsx";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) return <PageLoader/>;
  console.log("authUser" , authUser);
  console.log("user" , authUser?.isProfileComplete);
  const isAuthenticated = Boolean(authUser);
  const isProfileComplete = authUser?.isProfileComplete;
  
  return (
    <div className="min-h-screen " data-theme={theme} >
      <Routes>
        <Route path = "/" element = {isAuthenticated && isProfileComplete? 
        <Layout showSidebar = {true}>
          <HomePage/> 
        </Layout>
        : <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"} />}/>
        <Route path = "/signup" element = {isAuthenticated? <Navigate to = "/" /> : <SignUpPage/>}/>
        <Route path = "/login" element = {isAuthenticated? <Navigate to = "/" /> : <LoginPage/>}/>
        <Route path = "/notifications" element = {isAuthenticated && isProfileComplete ? <Layout showSidebar = {true}><NotificationsPage/></Layout> : ( <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"}/>)}/>
        <Route path = "/call" element = {isAuthenticated? <CallPage/> : <Navigate to = "/login" />}/>
        <Route path = "/chats" element = {isAuthenticated && isProfileComplete ? <Layout showSidebar = {false} ><ChatPage/></Layout> : ( <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"}/>)}/>
        {/* <Route path = "/chats/:id" element = {isAuthenticated && isProfileComplete ? <Layout showSidebar = {false} ><ChatPage/></Layout> : ( <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"}/>)}/> */}
        <Route path = "/profilesetup" element={ isAuthenticated ? (!isProfileComplete ? (<ProfileSetupPage />) : (  <Navigate to="/" />  )) : (  <Navigate to="/login" /> )}/>
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;