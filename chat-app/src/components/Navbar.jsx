import { Link } from "react-router-dom";
import { LogOut, SendHorizontal, Settings, User } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser, login } = useAuthStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      login(JSON.parse(storedUser)); 
    }
  }, [login]);

  const navigateToHome = () => {
    window.location.href = "http://localhost:3001/home"; 
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <button onClick={navigateToHome} className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <SendHorizontal className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">UniComm</h1>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser ? (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm gap-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
