import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket,
  CheckCircle,
  Shield,
  Clock,
  Phone,
  Mail,
  User,
  Briefcase
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EnquiryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { purpose = 'Hiring Only', planName = 'Hiring Plan' } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    purpose: purpose,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    toast.success('Request submitted successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-gray-600 mb-2">
            Thank you for your interest in our {planName}.
          </p>
          <p className="text-gray-600 mb-8">
            Our team will contact you shortly.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-3 border rounded-xl"
            >
              View All Plans
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">CareerLaunch</h1>
              <p className="text-xs text-gray-500">Your Career, Accelerated</p>
            </div>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex justify-center py-16 px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Request a <span className="text-blue-600">Demo</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Fill the form and our team will reach out shortly.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Clock className="text-blue-600" />
                <p>Quick response within 24 hours</p>
              </div>
              <div className="flex gap-4">
                <Shield className="text-purple-600" />
                <p>Your data is secure</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-green-600" />
                <p>No obligation</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                name="mobile"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                name="email"
                type="email"
                placeholder="Work Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                name="purpose"
                value={formData.purpose}
                readOnly
                className="w-full p-3 bg-gray-100 border rounded-lg"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
              >
                {isSubmitting ? 'Processing...' : 'Request Callback'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-6 text-center">
        © 2024 CareerLaunch. All rights reserved.
      </footer>
    </div>
  );
}
