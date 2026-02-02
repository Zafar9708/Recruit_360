import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { authApi } from "../../utils/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [countdown, setCountdown] = useState(5);

  // Debug: Force log on every render
  console.log("🔄 RENDER - Status:", status, "Token:", token);

  // Effect 1: Handle verification
  useEffect(() => {
    console.log("🎬 EFFECT 1 - Starting verification");
    
    if (!token) {
      console.error("❌ No token provided");
      toast.error("Invalid verification link");
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      console.log("📨 Calling verifyEmail API");
      try {
        const response = await authApi.verifyEmail(token);
        console.log("✅ API Response:", response.data);
        
        if (response.data?.success) {
          console.log("🎉 Verification successful!");
          setStatus("success");
          
          // Store token if provided
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            console.log("🔑 Token saved to localStorage");
          }
          
        } else {
          console.error("❌ Verification failed in response");
          toast.error(response.data?.message || "Verification failed");
          setStatus("error");
        }
      } catch (error) {
        console.error("🔥 API Error:", error);
        console.error("🔥 Error details:", error.response?.data);
        toast.error(error.response?.data?.message || "Network error. Please try again.");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  // Effect 2: Handle countdown and navigation on success
  useEffect(() => {
    console.log("🎬 EFFECT 2 - Status:", status);
    
    if (status === "success") {
      console.log("⏱️ Starting countdown...");
      
      const interval = setInterval(() => {
        setCountdown(prev => {
          console.log("Countdown:", prev - 1);
          if (prev <= 1) {
            clearInterval(interval);
            console.log("🔀 Navigating to /profile-setup");
            navigate("/profile-setup", { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        console.log("🧹 Cleaning up interval");
        clearInterval(interval);
      };
    }
  }, [status, navigate]);

  // Effect 3: Add a backup navigation after 5 seconds
  useEffect(() => {
    if (status === "success") {
      console.log("🕒 Setting backup navigation timeout");
      
      const backupTimeout = setTimeout(() => {
        console.log("🆘 Backup navigation triggered");
        navigate("/profile-setup", { replace: true });
      }, 8000); // 8 seconds backup

      return () => {
        console.log("🧹 Cleaning up backup timeout");
        clearTimeout(backupTimeout);
      };
    }
  }, [status, navigate]);

  // Manual navigation handler
  const handleManualNavigate = () => {
    console.log("🖱️ Manual navigation clicked");
    navigate("/profile-setup", { replace: true });
  };

  // If nothing shows up, add a timeout to check if component mounted
  useEffect(() => {
    const mountCheck = setTimeout(() => {
      console.log("🕵️ Component mount check - should have logged by now");
    }, 1000);

    return () => clearTimeout(mountCheck);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center space-y-6">
        
        {/* Verifying State */}
        {status === "verifying" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Verifying Email
            </h2>
            <p className="text-gray-500">
              Please wait while we verify your email address...
            </p>
            <div className="pt-4">
              <div className="text-sm text-gray-400 bg-gray-50 p-3 rounded">
                <p>Debug: Component is mounted</p>
                <p>Token present: {token ? "Yes" : "No"}</p>
              </div>
            </div>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Success!</h2>
            <p className="text-gray-600 text-lg">
              Your email has been verified successfully!
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-bold">
                  Redirecting in {countdown} seconds...
                </p>
              </div>
              <button
                onClick={handleManualNavigate}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Go to Profile Setup Now
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}

        {/* Error State */}
        {status === "error" && (
          <>
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Oops!</h2>
            <p className="text-gray-600">
              We couldn't verify your email. The link may have expired or is invalid.
            </p>
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate("/register/candidate")}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Register Again
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
              >
                Go to Login
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 text-gray-600 hover:text-gray-800"
              >
                Try Again
              </button>
            </div>
          </>
        )}

        {/* Debug Panel - Always show */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <details className="text-left">
            <summary className="text-sm text-gray-500 cursor-pointer">
              Debug Information
            </summary>
            <div className="mt-2 text-xs bg-gray-50 p-3 rounded space-y-1">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Token Present:</strong> {token ? "Yes" : "No"}</p>
              <p><strong>Token Length:</strong> {token?.length || 0}</p>
              <p><strong>Countdown:</strong> {countdown}</p>
              <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}