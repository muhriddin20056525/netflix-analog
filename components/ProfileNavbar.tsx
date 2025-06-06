"use client";

import { Profile } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Loader from "./Loader";
import LoginProfileModal from "./LoginProfileModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

type ProfileNavbarProps = {
  name: string;
  avatar: string;
};

function ProfileNavbar({ name, avatar }: ProfileNavbarProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [profileId, setProfileId] = useState<string>("");
  const [isLoginProfileModal, setIsLoginProfileModal] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");

  const router = useRouter();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfiles(response.data.profiles);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = () => {
    if (!searchText) {
      return toast.error("Enter movie name");
    }

    router.push(`/search?q=${searchText}`);
  };

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between bg-black shadow-md">
      <div className="text-xl font-bold text-gray-800">
        <img src="/netflix-logo.webp" alt="netflix logo" width={120} />
      </div>

      <div className="relative flex items-center grow gap-4 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-full border-white text-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 text-gray-500 hover:text-blue-600"
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center gap-3 relative">
        <Link href={"/favorites"} className="text-sm font-medium text-white">
          Favorites
        </Link>

        <span className="text-sm font-medium text-white">{name}</span>
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border"
          onClick={() => setIsOpenModal(!isOpenModal)}
        />

        {isOpenModal && (
          <div className="absolute bg-white top-15 right-0 p-2 rounded w-40 flex flex-col gap-3 z-10">
            {profiles.map((profile) =>
              profile.name !== name ? (
                <span
                  onClick={() => {
                    setIsLoginProfileModal(true);
                    setProfileId(profile._id);
                  }}
                  key={profile._id}
                  className="cursor-pointer"
                >
                  {profile.name}
                </span>
              ) : null
            )}

            <button
              onClick={() => router.push("/dashboard")}
              className="bg-red-500 text-white p-1 rounded font-medium cursor-pointer"
            >
              Go To Dashboard
            </button>
          </div>
        )}

        {isLoginProfileModal && (
          <LoginProfileModal
            profileId={profileId}
            setShowPasswordModal={setIsLoginProfileModal}
          />
        )}
      </div>
    </nav>
  );
}

export default ProfileNavbar;
