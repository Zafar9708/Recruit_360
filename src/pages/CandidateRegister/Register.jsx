import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google'; 
import { authApi } from '../../utils/api';
import { Upload, Mail, Lock, User, Loader2, FileText, Sparkles, ArrowRight, Check, Briefcase, Shield } from 'lucide-react';

// Mock resume parsing function
const parseResume = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fullName: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        skills: ["React", "TypeScript", "Node.js", "AWS"],
        summary: "Senior Frontend Developer with 5+ years experience"
      });
    }, 1000);
  });
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await authApi.googleLogin({ token: tokenResponse.access_token });
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          navigate('/profile-setup');
        }
      } catch (error) {
        toast.error('Google login failed');
      }
    },
  });

  const handleFileUpload = async (file) => {
    const validTypes = ['application/pdf', '.doc', '.docx'];
    if (!validTypes.some(type => file.type.includes(type) || file.name.endsWith(type.replace('.', '')))) {
      toast.error('Please upload PDF or DOC file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be less than 5MB');
      return;
    }
    
    setUploadedFile(file);
    setIsParsing(true);
    
    try {
      const extractedData = await parseResume(file);
      
      setValue('fullName', extractedData.fullName);
      setValue('email', extractedData.email);
      
      localStorage.setItem('resumeData', JSON.stringify(extractedData));
      
      toast.success('Resume parsed successfully!');
    } catch (error) {
      toast.error('Failed to parse resume');
    } finally {
      setIsParsing(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (uploadedFile) formData.append('resume', uploadedFile);

      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              token: 'dummy-token-123'
            }
          });
        }, 1000);
      });

      if (response.data.success) {
        localStorage.setItem('token', 'dummy-token-123');
        localStorage.setItem('userName', data.fullName);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', 'candidate');
        
        toast.success('Account created successfully!');
        navigate('/profile-setup');
      }
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
           
          </div>
          <h2 className="text-3xl font-black text-blue-950 mb-2">Create Account</h2>
          <p className="text-blue-600">Join thousands of professionals finding dream jobs</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Upload Section */}
          <div className="p-8 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-blue-950">Quick Start with Resume</h3>
                <p className="text-sm text-blue-600">Upload resume to auto-fill details</p>
              </div>
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className={`relative group border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              uploadedFile 
                ? 'border-green-500 bg-green-50/30' 
                : isParsing
                ? 'border-blue-300'
                : 'border-blue-200 hover:border-blue-400 cursor-pointer'
            }`}>
              <input 
                id="cv-upload" 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])} 
              />
              
              {isParsing ? (
                <div className="py-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-blue-700 font-medium">Parsing your resume...</p>
                  <p className="text-sm text-blue-600">Extracting information...</p>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-blue-950 truncate">{uploadedFile.name}</p>
                      <p className="text-sm text-green-600 font-medium">✓ Successfully uploaded</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('cv-upload').click()}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Upload different file
                  </button>
                </div>
              ) : (
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-blue-950 font-semibold mb-2">Upload Resume</p>
                  <p className="text-blue-600 text-sm">PDF or DOC up to 5MB</p>
                  <p className="text-xs text-blue-500 mt-2">We'll auto-fill your information</p>
                </label>
              )}
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input 
                      {...register('fullName', { 
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name is too short' }
                      })} 
                     
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none ${
                        errors.fullName ? 'border-red-300' : 'border-blue-200'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input 
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { 
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                          message: 'Invalid email address' 
                        }
                      })} 
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none ${
                        errors.email ? 'border-red-300' : 'border-blue-200'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input 
                      type="password"
                      {...register('password', { 
                        required: 'Password is required', 
                        minLength: { value: 6, message: 'Minimum 6 characters' }
                      })} 
                      placeholder="••••••••" 
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none ${
                        errors.password ? 'border-red-300' : 'border-blue-200'
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input 
                      type="password"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: v => v === watch('password') || 'Passwords must match' 
                      })} 
                      placeholder="••••••••" 
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none ${
                        errors.confirmPassword ? 'border-red-300' : 'border-blue-200'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Shield className="w-4 h-4" />
                <span>Your data is secure and encrypted</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-xl font-semibold hover:from-blue-900 hover:to-blue-800 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-blue-600 text-sm font-medium">OR</span>
              </div>
            </div>

            <button 
              onClick={() => loginWithGoogle()}
              className="w-full py-3.5 border border-blue-200 rounded-xl text-blue-900 hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-3"
            >
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Sign up with Google
            </button>

            <div className="mt-8 pt-6 border-t border-blue-100 text-center">
              <p className="text-blue-700">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-950 font-semibold hover:text-blue-800">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-950">AI Resume Parser</p>
              <p className="text-xs text-blue-600">Auto-fill your details</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-950">Smart Matching</p>
              <p className="text-xs text-blue-600">Find relevant jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-950">Secure Platform</p>
              <p className="text-xs text-blue-600">Encrypted & private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}