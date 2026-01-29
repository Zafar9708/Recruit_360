import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Users,
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Loader2,
  MapPin,
  Building,
  Globe
} from 'lucide-react';

export default function EndClientRegistrationPage() {
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const password = watch('password');

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    setVerificationSent(true);

    localStorage.setItem('userRole', 'end-client');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.contactPersonName);
    localStorage.setItem('companyName', data.companyName);

    toast.success('Verification email sent! Please check your inbox.');

    setTimeout(() => {
      toast.success('Email verified! Redirecting to client dashboard...');
      navigate('/end-client/dashboard');
    }, 2000);
  });

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Verifying...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            End Client Registration
          </h1>
          <p className="text-gray-600">
            Register your company to hire candidates
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('companyName', { required: 'Company name is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                  placeholder="Your Company Ltd"
                />
              </div>
              {errors.companyName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Person Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('contactPersonName', { required: 'Contact name is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('confirmPassword', {
                    validate: value =>
                      value === password || 'Passwords do not match'
                  })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Client Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
