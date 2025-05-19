import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Loader from "./Loader";

type ProfileModalProps = {
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
};

function ProfileModal({ setShowProfileModal }: ProfileModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    name: "",
    password: "",
    avatar: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileData.name || !profileData.password || !profileData.avatar) {
      return alert("Error Input");
    }

    const { data } = await axios.post("/api/profile", profileData);
    setShowProfileModal(false);
  };

  const uplaodImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file.name);

    const { data } = await axios.post("/api/upload", formData);
    setProfileData({ ...profileData, avatar: data.url });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Profile Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter password"
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-700"
              onChange={uplaodImage}
            />
            {isLoading && <Loader />}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowProfileModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
