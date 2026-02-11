import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Lock, ArrowLeft, Loader2, Building2, Briefcase, Shield, Users } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

export default function EndClientLoginPage() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store login info
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userRole', 'end-client');
    localStorage.setItem('userName', 'Sterling-Knight Global');

    toast.success('Welcome back! Redirecting to your dashboard...');
    navigate('/end-client/dashboard');
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth for organizations would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-blue-950 mb-2">End Client Login</h1>
          <p className="text-blue-600 font-medium">Access your hiring dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
          {/* Company Info */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-950">Talent Acquisition Portal</h3>
                <p className="text-sm text-blue-600">Post jobs, manage applicants, track hiring</p>
              </div>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-semibold text-blue-950">Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-blue-600 font-medium">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="pl-10 w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none text-blue-950"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none text-blue-950"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-200" 
                />
                <span className="text-sm text-blue-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in to Dashboard'
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-blue-100 text-center">
          
            <p className="text-sm text-blue-500 mt-4">
              Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}