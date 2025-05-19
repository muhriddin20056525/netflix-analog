"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import ProfileCard from "@/components/ProfileCard";
import ProfileModal from "@/components/ProfileModal";
import { Profile } from "@/types";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState("");

  const [password, setPassword] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfiles(response.data.profiles);
    } catch (error: any) {
      setError(error.response?.data?.error || "Xatolik yuz berdi");
    }
  };

  const handleProfileLogin = async () => {
    if (!password || !userId) return;

    try {
      const { data } = await axios.post("/api/profile/login", {
        password,
        profileId: userId,
      });

      router.push(`/profile/${data.profile._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [showProfileModal]);

  const deleteProfile = async (id: string) => {
    try {
      await axios.delete(`/api/profile/${id}`);
      fetchProfiles();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DashboardNavbar setShowProfileModal={setShowProfileModal} />

      {showProfileModal && (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      )}

      <div className="flex items-center justify-center flex-wrap py-5 gap-4">
        {profiles.length > 0 &&
          profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              deleteProfile={deleteProfile}
              setShowPasswordModal={setShowPasswordModal}
              setUserId={setUserId}
            />
          ))}
      </div>

      {showPasswordModal && (
        <div
          onClick={() => setShowPasswordModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Enter Your Password
            </h2>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={handleProfileLogin}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
