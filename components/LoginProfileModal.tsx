import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type LoginProfileModalProps = {
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

function LoginProfileModal({
  setShowPasswordModal,
  userId,
}: LoginProfileModalProps) {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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
