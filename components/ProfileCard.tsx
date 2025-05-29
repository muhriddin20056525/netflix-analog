import { Profile } from "@/types";
import { Dispatch, SetStateAction } from "react";

type ProfileCardProps = {
  profile: Profile;
  deleteProfile: (id: string) => void;
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  setProfileId: Dispatch<SetStateAction<string>>;
};

function ProfileCard({
  profile,
  deleteProfile,
  setShowPasswordModal,
  setProfileId,
}: ProfileCardProps) {
  return (
    <div className="max-w-xs w-[400px] bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3
          className="text-xl font-semibold text-gray-800 cursor-pointer hover:underline"
          onClick={() => {
            setShowPasswordModal(true);
            setProfileId(profile._id);
          }}
        >
          {profile.name}
        </h3>
        <button
          onClick={() => deleteProfile(profile._id)}
          className="w-full bg-red-500 mt-4 py-1 rounded text-white text-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
