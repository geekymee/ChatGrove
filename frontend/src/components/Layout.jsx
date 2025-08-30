import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useChatStore } from "../store/useChatStore";
import CallUser from "../components/CallUser";

const Layout = ({ children, showSidebar = false }) => {
  const { showReceiverPopUp, ReceiverDetails } = useChatStore();
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto">{children}</main>

          {showReceiverPopUp && ReceiverDetails && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="relative">
                <CallUser reciever={ReceiverDetails} />
              </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Layout;