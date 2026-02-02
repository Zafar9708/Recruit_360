import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Lock, ArrowLeft, Loader2, Building2, Users } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
export default function OrganizationLoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('end-client');
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      role: 'end-client'
    }
  });

  const onSubmit = async (data) => {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store login info (in real app, this would be tokens from backend)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userRole', data.role);

    toast.success(`Login successful! Welcome ${data.role === 'vendor' ? 'Vendor' : 'End Client'}`);

    // Redirect based on role
    if (data.role === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/end-client/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth for organizations would be implemented here');
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Organization Login</h1>
          <p className="text-gray-600">Access your organization's dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('end-client')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'end-client'
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  selectedRole === 'end-client' ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    selectedRole === 'end-client' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <p className={`font-semibold ${
                  selectedRole === 'end-client' ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  End Client
                </p>
                <p className="text-xs text-gray-500 mt-1">Hiring company</p>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('vendor')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'vendor'
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  selectedRole === 'vendor' ? 'bg-purple-600' : 'bg-gray-100'
                }`}>
                  <Users className={`w-6 h-6 ${
                    selectedRole === 'vendor' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <p className={`font-semibold ${
                  selectedRole === 'vendor' ? 'text-purple-600' : 'text-gray-700'
                }`}>
                  Vendor
                </p>
                <p className="text-xs text-gray-500 mt-1">Staffing agency</p>
              </motion.button>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...register('role')} value={selectedRole} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="organization@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                selectedRole === 'vendor'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? 'Logging in...' : `Login as ${selectedRole === 'vendor' ? 'Vendor' : 'End Client'}`}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an organization account?{' '}
            <Link to="/pricing" className="text-blue-600 hover:underline font-medium">
              View Plans
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700">
              Looking for candidate login? <span className="text-blue-600 hover:underline">Click here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
