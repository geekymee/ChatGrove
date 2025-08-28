import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, Shrub } from "lucide-react";
import ThemeSelector from "./ThemeSelecter";
import { useAuthStore } from "../store/useAuthStore.js";
const Navbar = () => {
  const { logout , authUser } = useAuthStore();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");


  return (
    <nav className= {`bg-base-200 border-b border-base-300 h-16 flex items-center z-30 ${isChatPage ? "fixed inset-0" : ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5 ">
              <Link to="/" className="flex items-center gap-2.5">
                <Shrub className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  ChatGrove
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logout}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;