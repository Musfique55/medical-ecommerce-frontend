"use client";
import { User, MoreVertical } from "lucide-react";
import { use } from "react";

type UserRole = "CUSTOMER" | "ADMIN" | "SELLER";
type UserStatus = "ban" | "unban";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  image: string | null;
  emailVerified: boolean;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

const RecentUsers = ({ usersPromise }: { usersPromise: Promise<any> }) => {
  const res = use(usersPromise);
  const users = res.data;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
        <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Join Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-gray-600">{user.createdAt}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.role}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-teal-600">
                    {user.status}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
