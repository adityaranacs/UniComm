import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Mail, SendHorizontal } from 'lucide-react';

const HomePage = () => {
  const { authUser, checkAuth } = useAuthStore();

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // If not authenticated, redirect to login page
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // Function to handle external navigation to micro-frontends
  const navigateToApp = (appUrl) => {
    window.location.href = appUrl;
  };

  return (
    <div className="h-screen bg-base-100 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-3xl space-y-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <SendHorizontal className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome to UniComm</h1>
            <p className="text-base-content/60">Your all-in-one communication platform</p>
          </div>
        </div>

        {/* Apps Grid Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chat App Card */}
          <div
            className="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer"
            onClick={() => navigateToApp('http://localhost:3002/chat')}
          >
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h2 className="card-title text-base-content mt-2">Chat App</h2>
              <p className="text-base-content/60">Real-time messaging and collaboration</p>
            </div>
          </div>

          {/* Mail App Card */}
          <div
            className="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer"
            onClick={() => navigateToApp('http://localhost:3003/mail')}
          >
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className="card-title text-base-content mt-2">Mail App</h2>
              <p className="text-base-content/60">Secure email communication platform</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4 text-sm text-base-content/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
