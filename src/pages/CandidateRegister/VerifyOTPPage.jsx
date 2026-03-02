import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Shield, Mail, Loader2, Check, ArrowLeft } from 'lucide-react';

const verifyOTP = async (email, otp) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/verify-otp",
    { email, otp }
  );
  return response.data;
};

// Simulate final registration API
const completeRegistration = async (userData) => {
  // In production, call your backend API to save user
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        token: 'final-jwt-token-123',
        user: { ...userData, id: 'user-' + Date.now() }
      });
    }, 1500);
  });
};

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const email = location.state?.email || sessionStorage.getItem('pendingEmail') || '';
  
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
    
    // Store email in sessionStorage
    sessionStorage.setItem('pendingEmail', email);
    
    // Timer for resend
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await verifyOTP(email, otpString);
      
      if (result.success) {
        // Get pending registration data
        const pendingData = JSON.parse(sessionStorage.getItem('pendingRegistration') || '{}');
        const resumeData = JSON.parse(sessionStorage.getItem('resumeData') || '{}');
        
        // Combine all data
        const finalUserData = {
          ...pendingData,
          ...resumeData,
          emailVerified: true,
          verifiedAt: new Date().toISOString()
        };
        
        // Complete registration
        const registrationResult = await completeRegistration(finalUserData);
        
        if (registrationResult.success) {
          // Clear temporary data
          sessionStorage.removeItem('pendingRegistration');
          sessionStorage.removeItem('pendingEmail');
          // Keep resumeData for profile setup
          
          // Set auth tokens
          localStorage.setItem('token', registrationResult.token);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userRole', 'candidate');
          
          toast.success('Email verified successfully!');
          
          // Navigate to profile setup
          navigate('/profile-setup');
        }
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setCanResend(false);
    setTimeLeft(60);
    toast.success('New OTP sent to your email');
    // In production, call API to resend OTP
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/register')}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-950 mb-2">Verify Your Email</h2>
              <p className="text-blue-600">
                We've sent a verification code to
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-blue-800 font-semibold">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            </div>

            {/* OTP Input */}
            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-blue-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Resend Code
                  </button>
                ) : (
                  <p className="text-blue-600">
                    Resend available in {timeLeft} seconds
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={isVerifying || otp.join('').length !== 6}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Email
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Note */}
              <p className="text-sm text-blue-600 text-center">
                Enter the 6-digit code sent to your email address
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-600">
            This helps us keep your account secure
          </p>
        </div>
      </motion.div>
    </div>
  );
}