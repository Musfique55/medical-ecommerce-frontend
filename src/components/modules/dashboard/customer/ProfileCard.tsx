"use client"
import { authClient } from "@/lib/authClient";
import { Edit, User } from "lucide-react";
import Link from "next/link";


const ProfileCard = () => {
    const user = authClient.useSession();
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-5 sm:p-6 text-white">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center relative">
            <User className="w-7 h-7 text-teal-600" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-1">
        {user.data?.user.name}
      </h2>
      <p className="text-teal-100 text-center text-sm mb-6">
        Member since Jan 2022
      </p>

    <Link href={"/dashboard/profile"}>
      <button className="w-full bg-white text-teal-600 font-semibold py-3 px-4 rounded-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
        <Edit className="w-4 h-4" />
        Manage Profile
      </button>
    </Link>
    </div>
  );
};

export default ProfileCard;
