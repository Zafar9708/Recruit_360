import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Lock, ArrowLeft, Loader2, Shield, Users, Building2, Briefcase, TrendingUp } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
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
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('userName', 'Admin User');

    toast.success('Welcome back! Redirecting to admin dashboard...');
    navigate('/admin/dashboard');
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth for admin would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-indigo-950 mb-2">Admin Login</h1>
          <p className="text-indigo-600 font-medium">Access your platform administration dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8">
          {/* Admin Info */}
          <div className="mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50/30 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-950">Admin Control Panel</h3>
                <p className="text-sm text-indigo-600">Manage vendors, clients, candidates & platform analytics</p>
              </div>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
              <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-indigo-600">Vendors</p>
              <p className="text-lg font-bold text-indigo-950">156</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center">
              <Briefcase className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-purple-600">Clients</p>
              <p className="text-lg font-bold text-indigo-950">234</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl border border-pink-100 text-center">
              <Building2 className="w-5 h-5 text-pink-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-pink-600">Candidates</p>
              <p className="text-lg font-bold text-indigo-950">1.8K</p>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-semibold text-indigo-950">Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-indigo-600 font-medium">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-indigo-900 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="pl-10 w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-indigo-950"
                  placeholder="admin@recruit360.com"
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
              <label className="block text-sm font-semibold text-indigo-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                <input
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-indigo-950"
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
                  className="w-4 h-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-200" 
                />
                <span className="text-sm text-indigo-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in to Admin Portal'
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-indigo-100 text-center">
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-indigo-600">Full control</span>
              </div>
              <div className="w-1 h-1 bg-indigo-300 rounded-full" />
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-indigo-600">Secure access</span>
              </div>
              <div className="w-1 h-1 bg-indigo-300 rounded-full" />
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-indigo-600">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}