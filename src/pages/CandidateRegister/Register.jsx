import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google'; 
import { authApi } from '../../utils/api';
import { Upload, Mail, Lock, ArrowLeft, Loader2, CheckCircle2, User, AlertCircle, Send } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched' 
  });
  
  const password = watch('password');

  // --- GOOGLE API INTEGRATION ---
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await authApi.googleLogin({ token: tokenResponse.access_token });
        if (response.data.success) {
          toast.success('Logged in with Google!');
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Google login failed. Please try again.');
      }
    },
  });

  const handleFileUpload = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) return toast.error('Please upload a PDF or DOC file');
    if (file.size > 5 * 1024 * 1024) return toast.error('File size must be less than 5MB');
    setUploadedFile(file);
    toast.success('Resume attached successfully!');
  };

  // --- REGISTRATION API INTEGRATION ---
  const onRegisterSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // 1. Append text fields
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      
      // 2. Append the file with the name the backend expects
      if (uploadedFile) {
        // We changed 'cv' to 'resume' to match your backend Multer config
        formData.append('resume', uploadedFile); 
      }

      const response = await authApi.register(formData);

      if (response.data.success) {
        setRegisteredEmail(data.email);
        setIsEmailSent(true);
        toast.success('Verification email sent!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(message);
    }
  };

  // Show Success State after Registration
  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <Send className="w-10 h-10 text-blue-600 animate-bounce" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Verify your email</h2>
          <p className="text-gray-500 text-sm">
            We've sent a verification link to <br/>
            <span className="font-bold text-gray-800">{registeredEmail}</span>
          </p>
          <button onClick={() => setIsEmailSent(false)} className="text-blue-600 text-xs font-bold hover:underline">
            Back to registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-blue-600 mb-6 transition-all uppercase tracking-widest">
          <ArrowLeft className="w-3 h-3 mr-2" /> Back to portal
        </Link>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight text-center">Get Started</h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium italic">
          "Join 10,000+ professionals finding dreams jobs"
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] sm:rounded-3xl sm:px-10 border border-gray-100">
          
          <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
            <InputField 
              label="Full Name" 
              register={register('fullName', { 
                required: 'Full name is required',
                minLength: { value: 3, message: 'Name is too short' },
                pattern: { value: /^[a-zA-Z ]+$/, message: 'Only alphabets are allowed' }
              })} 
              error={errors.fullName} 
              placeholder="Enter your full name" 
              icon={<User className="w-4 h-4" />} 
            />

            <InputField 
              label="Email Address" 
              type="email" 
              register={register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                }
              })} 
              error={errors.email} 
              placeholder="you@company.com" 
              icon={<Mail className="w-4 h-4" />} 
            />

            <InputField 
              label="Password" 
              type="password" 
              register={register('password', { 
                required: 'Password is required', 
                minLength: { value: 8, message: 'Minimum 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Must include Uppercase, Lowercase, and Number'
                }
              })} 
              error={errors.password} 
              icon={<Lock className="w-4 h-4" />} 
            />

            <InputField 
              label="Confirm Password" 
              type="password" 
              register={register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: v => v === password || 'Passwords do not match' 
              })} 
              error={errors.confirmPassword} 
              icon={<Lock className="w-4 h-4" />} 
            />

            <div className="pt-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest flex justify-between">
                Resume / CV (Optional)
                <span className="lowercase font-normal">max 5MB</span>
              </label>
              <div className={`group relative border-2 border-dashed rounded-2xl p-4 text-center transition-all ${uploadedFile ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-blue-400 bg-gray-50/30'}`}>
                <input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e.target.files[0])} />
                {uploadedFile ? (
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center text-xs font-bold text-gray-800 truncate">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {uploadedFile.name}
                    </div>
                    <label htmlFor="cv-upload" className="text-[10px] text-blue-600 hover:underline font-black uppercase cursor-pointer">Edit</label>
                  </div>
                ) : (
                  <label htmlFor="cv-upload" className="cursor-pointer flex items-center justify-center gap-2 text-xs text-gray-500 font-bold py-1">
                    <Upload className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span>Upload PDF for AI processing</span>
                  </label>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-xl shadow-blue-200 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CREATE ACCOUNT'}
              </button>

              <div className="relative py-2 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-3 bg-white text-[10px] font-black text-gray-400 uppercase tracking-tighter">OR</span>
              </div>

              <button 
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full flex items-center justify-center py-3.5 px-4 border border-gray-200 rounded-2xl bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all active:bg-gray-100"
              >
                <img className="h-5 w-5 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Continue with Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-blue-600 font-black hover:text-blue-700 underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Reuse your custom InputField component
function InputField({ label, type = "text", register, error, placeholder, icon }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-300 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          {icon}
        </div>
        <input 
          {...register} 
          type={type} 
          placeholder={placeholder} 
          className={`block w-full pl-11 pr-4 py-3.5 border ${error ? 'border-pink-300 bg-red-50' : 'border-gray-100 bg-gray-50/20'} rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all`} 
        />
        {error && <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />}
      </div>
      {error && <p className="mt-2 text-[10px] text-pink-500 font-black uppercase tracking-tight ml-1">{error.message}</p>}
    </div>
  );
}