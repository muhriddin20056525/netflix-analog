import { IAccount } from "@/types";
import axios from "axios";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";
import ChangeAccountModal from "./ChangeAccountModal";
import { useAccount } from "@/context/AccountContext";
import { useRouter } from "next/navigation";

type NavbarProps = {
  account: IAccount | null;
};

function Navbar({ account }: NavbarProps) {
  // All Accounts State
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  // Toggle Accounts Modal State
  const [accountModal, setAccountModal] = useState<boolean>(false);
  // Get AccountID State
  const [accountId, setAccountId] = useState<string>("");
  // Toggle Change Account Modal
  const [changeAccountModal, setChangeAccountModal] = useState<boolean>(false);

  // Session For Get User Id
  const { data: session } = useSession();
  // useRouter For Go Back Button
  const router = useRouter();

  // Get All Accounts
  useEffect(() => {
    if (!session?.user.id) return;
    // Request For Get All Account
    const getAllAccounts = async () => {
      try {
        // Request to backend for get all accunts of this user
        const { data } = await axios.get("/api/accounts", {
          params: {
            uid: session?.user.id,
          },
        });
        // Set State taken account
        setAccounts(data.accounts);
      } catch (error) {
        console.log(error);
      }
    };

    getAllAccounts();
  }, [session?.user.id]);

  return (
    <nav className="bg-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-xl">Netflix</div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 rounded overflow-hidden w-[900px] max-w-[900px]">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="p-2 hover:bg-gray-600 transition-colors duration-200 text-white">
          <Search size={20} />
        </button>
      </div>

      {/*Navbar End */}
      <div className="flex items-center gap-4">
        <Link
          href="/favorites"
          className="text-white hover:text-red-400 transition"
        >
          Favorites
        </Link>
        <div className="relative">
          <div className="w-9 h-9">
            <img
              src={account?.accountImg}
              alt="Profile"
              onClick={() => setAccountModal(!accountModal)}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>

          {/* Showing All Accounts */}
          {accountModal && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[300px] shadow-2xl p-5 absolute right-0 top-12 rounded"
            >
              {accounts.length > 0 ? (
                accounts.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => {
                      // Get Clicked Element Account ID
                      setAccountId(item._id);
                      // Toggle Change Account Modal
                      setChangeAccountModal(!changeAccountModal);
                      // Close To Choose Account Modal
                      setAccountModal(false);
                    }}
                    className="flex items-center gap-10 mb-5 hover:shadow w-full p-2 cursor-pointer"
                  >
                    <img
                      src={item.accountImg}
                      alt={item.username}
                      className="w-15 h-15 object-cover rounded-full"
                    />
                    <span>{item.username}</span>
                  </button>
                ))
              ) : (
                <Loader />
              )}

              <button
                onClick={() => router.push("/manage-accounts")}
                className="bg-red-500 w-full py-2 text-white font-medium rounded"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </div>

        {/* Change Account Modal */}
        {changeAccountModal && accountId && (
          <ChangeAccountModal
            setChangeAccount={setChangeAccountModal}
            accountId={accountId}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
