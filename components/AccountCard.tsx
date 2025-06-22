import { IAccount } from "@/types";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type AccountCardProps = {
  account: IAccount;
  deleteAccount: (id: string) => void;
  setChangeAccount: Dispatch<SetStateAction<boolean>>;
};

function AccountCard({
  account,
  deleteAccount,
  setChangeAccount,
}: AccountCardProps) {
  const { _id, accountImg, username } = account;

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4 w-full max-w-sm">
      {/* Image */}
      <img
        src={accountImg}
        alt={username}
        className="w-16 h-16 object-cover rounded-full border border-gray-200"
      />

      {/* Title */}
      <div
        className="flex-1 cursor-pointer group"
        onClick={() => setChangeAccount(true)}
      >
        <h2 className="text-lg font-semibold text-gray-800 group-hover:underline">
          {username}
        </h2>
      </div>

      {/* Delete Button */}
      <button
        className="text-red-500 hover:text-red-700 transition"
        title="Delete"
        onClick={() => deleteAccount(_id)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default AccountCard;
