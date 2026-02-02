import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';

export default function ProfilePhotoUpload({ currentPhoto, userName, onPhotoChange }) {
  const [preview, setPreview] = useState(currentPhoto || null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Call parent callback if provided
      if (onPhotoChange) {
        onPhotoChange(file);
      }
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Photo Circle */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
          {preview ? (
            <img
              src={preview}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-4xl">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
              onClick={triggerFileInput}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.div>
          )}
        </div>

        {/* Camera Icon Badge */}
        <button
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Upload className="w-5 h-5 text-white" />
        </button>

        {/* Remove Photo Button */}
        {preview && (
          <button
            onClick={handleRemovePhoto}
            className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Instructions */}
      <div className="text-center">
        <button
          onClick={triggerFileInput}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Change Photo
        </button>
        <p className="text-xs text-gray-500 mt-1">
          JPG, PNG or GIF (max. 5MB)
        </p>
      </div>
    </div>
  );
}
