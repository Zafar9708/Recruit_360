import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Loader2,
  MapPin,
  FileText
} from 'lucide-react';

export default function VendorRegistrationPage() {
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setVerificationSent(true);

    localStorage.setItem('userRole', 'vendor');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.contactPersonName);
    localStorage.setItem('companyName', data.companyName);

    toast.success('Verification email sent! Please check your inbox.');

    setTimeout(() => {
      toast.success('Email verified! Redirecting to vendor dashboard...');
      navigate('/vendor/dashboard');
    }, 2000);
  });

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Vendor Registration</h1>
          <p className="text-gray-600">Register your recruitment agency</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('companyName', { required: 'Company name is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
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
                  {...register('contactPersonName', {
                    required: 'Contact person name is required',
                  })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
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
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('address', { required: 'Address is required' })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Registration Number *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('registrationNumber', {
                    required: 'Registration number is required',
                  })}
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
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
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  type="password"
                  className="pl-10 w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting
                ? 'Creating Account...'
                : 'Create Vendor Account & Verify Email'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
