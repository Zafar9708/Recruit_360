import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "../utils/axios";

import { Upload, Mail, ArrowLeft, Loader2, User } from "lucide-react";

export default function CandidateRegistrationPage() {
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userId, setUserId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  /* ================= RESTORE USER ID ================= */

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  /* ================= FETCH PROFILE (GET /resume/resume/{id}) ================= */

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`api/resume/resume/resume/${userId}`);

        setValue("fullName", data.name || "");
        setValue("email", data.email || "");
      } catch {
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [userId, setValue]);

  /* ================= FILE DRAG & DROP ================= */

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      uploadResume(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      uploadResume(e.target.files[0]);
    }
  };

  /* ================= UPLOAD RESUME (POST /resume/upload) ================= */

  const uploadResume = async (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Upload PDF or DOC/DOCX only");
      return;
    }

    try {
      setIsUploading(true);
      setUploadedFile(file);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("api/resume/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserId(data.user_id);
      localStorage.setItem("user_id", data.user_id);

      toast.success("Resume uploaded successfully");
    } catch {
      toast.error("Resume upload failed");
    } finally {
      setIsUploading(false);
    }
  };


  /* ================= REGISTER ================= */

  const onSubmit = async (formData) => {
    try {
      await api.patch(`api/auth/auth/user/${userId}`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      

      setVerificationSent(true);
      toast.success("Verification email sent");
      setTimeout(() => navigate("/profile-setup"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  /* ================= EMAIL VERIFICATION UI ================= */

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl text-center shadow">
          <Mail className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-bold">Check your email</h2>
          <p className="text-gray-600 mt-2">
            Verification link sent successfully
          </p>
          <Loader2 className="animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      <Link
        to="/register"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Candidate Registration
        </h1>
        <p className="text-gray-600">
          Upload your resume or register manually
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Resume Upload */}
        {!uploadedFile && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all mb-8 ${
              dragActive
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <p className="font-medium text-gray-900">
                  Analyzing your resume...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-medium hover:text-blue-700">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-gray-600"> or drag and drop</span>
                </div>
                <p className="text-sm text-gray-500">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>
        )}

        {/* OR Divider */}
        {!uploadedFile && (
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        )}

        {/* Manual Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            {...register("email", { required: true })}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  </div>
);

}