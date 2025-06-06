import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

type LoginProfileModalProps = {
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  profileId: string;
};

function LoginProfileModal({
  setShowPasswordModal,
  profileId,
}: LoginProfileModalProps) {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleProfileLogin = async () => {
    if (!password || !profileId) {
      toast.error("Missing fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/profile/login", {
        password,
        profileId,
      });

      console.log(data);

      if (data?.profile?._id) {
        router.push(`/profile/${data.profile._id}`);
      } else {
        toast.error("Profile not found");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
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
  );
}

export default LoginProfileModal;
