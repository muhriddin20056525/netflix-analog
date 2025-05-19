"use client";

import ProfileNavbar from "@/components/ProfileNavbar";
import { Profile } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { id } = useParams();

  const [profileDetail, setProfileDetail] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/api/profile/${id}`);
      setProfileDetail(data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {profileDetail && (
        <ProfileNavbar
          name={profileDetail?.name}
          avatar={profileDetail?.avatar}
        />
      )}
    </div>
  );
}

export default ProfilePage;
