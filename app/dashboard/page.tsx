"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import LoginProfileModal from "@/components/LoginProfileModal";
import ProfileCard from "@/components/ProfileCard";
import ProfileModal from "@/components/ProfileModal";
import { Profile } from "@/types";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState("");

  const [profileId, setProfileId] = useState<string>("");

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
      const { data } = await axios.get(`/api/profile/${id}`);

      await axios.delete(`/api/upload/${data.profile.fileId}`);

      await axios.delete(`/api/profile/${id}`);
      fetchProfiles();
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
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
              setProfileId={setProfileId}
            />
          ))}
      </div>

      {showPasswordModal && (
        <LoginProfileModal
          setShowPasswordModal={setShowPasswordModal}
          profileId={profileId}
        />
      )}
    </div>
  );
}

export default Dashboard;
