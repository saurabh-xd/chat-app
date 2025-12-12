import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { MessageCircleMore, Camera, ArrowLeft, Loader2 } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      setLoading(false);
      navigate('/');
      return
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio })
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        
        

        <div className="md:p-8 p-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center md:mb-8 mb-6">
            <div className="relative">
              <img
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
                alt="Profile"
                className="md:size-30 size-25 rounded-full object-cover border-4 border-gray-800"
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 md:p-2.5 p-2 bg-teal-500 hover:bg-teal-600 rounded-full cursor-pointer transition-colors shadow-lg">
                <Camera className="md:size-5 size-4 text-white" />
                <input
                  onChange={(e) => setSelectedImg(e.target.files[0])}
                  type="file"
                  id="avatar"
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
              </label>
            </div>
            <p className="text-neutral-300  text-lg font-medium mt-3">Edit Profile</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:space-y-5 space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4  md:py-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Bio</label>
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Write something about yourself..."
                required
                rows={4}
                className="w-full px-4 md:py-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
              ></textarea>
              <p className="text-gray-500 text-xs mt-1">{bio.length}/150 characters</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;