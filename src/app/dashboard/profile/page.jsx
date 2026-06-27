
import React from "react";
import Image from "next/image";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCheckCircle,
  FiCamera,
  FiCalendar,
  FiEdit2
} from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";

const Profile = async () => {
  const session = await getUserSession();
  const user = session?.user;
console.log(user?.updatedAt);

const formattedDate = 
     new Date(user.updatedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
   ;
  // Fallback data 
  const profileData = {
    name: user?.name ,
    email: user?.email ,
    role: user?.role ,
    image: user?.image ,
    joinedDate: formattedDate,
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            My Profile
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            View and manage your account details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Side: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center pb-6">
            
            {/* Gradient Cover Banner */}
            <div className="w-full h-28 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Profile Image with Hover Effect (Overlapping) */}
            <div className="relative group cursor-pointer -mt-14 mb-4">
              <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <Image
                  src={profileData.image}
                  alt={profileData.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border-4 border-transparent">
                <FiCamera className="text-white size-6" />
              </div>
            </div>

            {/* Name and Role */}
            <h2 className="text-xl font-bold text-slate-800 mb-1 px-4 text-center">
              {profileData.name}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full uppercase tracking-wider mt-2 mb-5">
              <FiShield size={14} />
              {profileData.role}
            </span>

            {/* Status (Bottom divider) */}
            <div className="w-full px-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Account Status</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                <FiCheckCircle size={14} /> Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Information Form/Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
            
            {/* Form Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">
                Personal Information
              </h3>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUser className="text-slate-400 size-5" />
                  </div>
                  <input
                    type="text"
                    defaultValue={profileData.name}
                    readOnly
                    className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none text-slate-700 font-semibold focus:border-blue-400 focus:bg-white transition-colors cursor-default"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiMail className="text-slate-400 size-5" />
                  </div>
                  <input
                    type="email"
                    defaultValue={profileData.email}
                    readOnly
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-500 font-medium cursor-not-allowed opacity-90"
                  />
                </div>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Member Since
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiCalendar className="text-slate-400 size-5" />
                  </div>
                  <input
                    type="text"
                    defaultValue={profileData.joinedDate}
                    readOnly
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-600 font-medium cursor-default"
                  />
                </div>
              </div>

              {/* Edit Button */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm shadow-blue-200 hover:shadow-md flex items-center gap-2">
                  <FiEdit2 size={16} />
                  Edit Profile
                </button>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;