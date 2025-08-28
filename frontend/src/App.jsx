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
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const{isLoading , authUser} = useAuthUser();
  const {theme} = useThemeStore();
  if(isLoading) return <PageLoader/>;
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
        <Route path = "/call" element = {isAuthenticated? <CallPage/> : <Navigate to = "/login " />}/>
        <Route path = "/chats" element = {isAuthenticated && isProfileComplete ? <Layout showSidebar = {false} ><ChatPage/></Layout> : ( <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"}/>)}/>
        <Route path = "/chats/:id" element = {isAuthenticated && isProfileComplete ? <Layout showSidebar = {false} ><ChatPage/></Layout> : ( <Navigate to = {!isAuthenticated? "/login" : "/profilesetup"}/>)}/>
        <Route path = "/profilesetup" element={ isAuthenticated ? (!isProfileComplete ? (<ProfileSetupPage />) : (  <Navigate to="/" />  )) : (  <Navigate to="/login" /> )}/>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;