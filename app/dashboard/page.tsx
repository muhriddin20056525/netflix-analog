"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import LoginProfileModal from "@/components/LoginProfileModal";
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

  useEffect(() => {
    fetchProfiles();
  }, []);

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
        <LoginProfileModal
          setShowPasswordModal={setShowPasswordModal}
          userId={userId}
        />
      )}
    </div>
  );
}

export default Dashboard;
