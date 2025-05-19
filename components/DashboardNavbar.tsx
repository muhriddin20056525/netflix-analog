"use client";

import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

type DashboardNavbarProps = {
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
};

function DashboardNavbar({ setShowProfileModal }: DashboardNavbarProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-black shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">
        <img src="/netflix-logo.webp" alt="netflix logo" width={120} />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowProfileModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Create Profile
        </button>

        <div className="flex items-center gap-3 relative">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
              onClick={() => setShowModal(!showModal)}
            />
          )}

          {showModal && (
            <div className="absolute -left-52 top-15 bg-white w-[250px] flex flex-col p-2 space-y-2 rounded">
              <span className="text-gray-700 font-medium">
                {session?.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
