'use client'
import React, { useState } from "react";
import { User, Mail, Phone, Building, Camera } from "lucide-react";
import { useAuth } from "src/context/authContext";

export default function Profile ()  {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "User connected",
    email: user?.email || "zouinekhamine@gmail.com",
    phone: "+216-XX-XXX-XXX",
    organization: "Forum Tunisien pour l'Education",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h2>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-200"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">Click to change avatar</p>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organization: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
