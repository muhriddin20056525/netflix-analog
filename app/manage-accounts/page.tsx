"use client";

import AccountCard from "@/components/AccountCard";
import AddAccountModal from "@/components/AddAccountModal";
import ChangeAccountModal from "@/components/ChangeAccountModal";
import Loader from "@/components/Loader";
import { IAccount } from "@/types";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

function ManageAccountsPage() {
  // Get User Id From Next Auth
  const { data: session, status } = useSession();

  // Add Account Modal State
  const [isOpenAddAccountModal, setIsOpenAddAccountModal] =
    useState<boolean>(false);

  // Get All Account State
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  // Change Account Modal State
  const [changeAccount, setChangeAccount] = useState<boolean>(false);

  // Get Current Account Id State
  const [accountId, setAccountId] = useState<string>("");

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

  useEffect(() => {
    if (status !== "authenticated") return;

    getAllAccounts();
  }, [status, session]);

  // Delete Account
  const deleteAccount = async (id: string) => {
    try {
      // Send Request To Delete Api
      const { data } = await axios.delete(`/api/accounts/${id}`);
      //  Update Accounts State
      setAccounts((prev) => prev.filter((account) => account._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Check authentication and redirect if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="bg-slate-900 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400">Please login to access this page</p>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="bg-slate-900 h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 h-screen py-5">
      {/* Header with Add Account and Logout */}
      <div className="flex justify-between items-center px-8 mb-8">
        <h1 className="text-white text-2xl font-bold">Manage Accounts</h1>

        <div className="flex gap-4">
          {/* Add Account Button */}
          <button
            onClick={() => setIsOpenAddAccountModal(!isOpenAddAccountModal)}
            className="bg-white py-2 px-6 font-semibold rounded cursor-pointer active:scale-95 transition-all duration-200"
          >
            Add Account
          </button>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 font-semibold rounded cursor-pointer active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Showing AddAccount Modal */}
      {isOpenAddAccountModal ? (
        <AddAccountModal
          setIsOpenAddAccountModal={setIsOpenAddAccountModal}
          getAllAccounts={getAllAccounts}
        />
      ) : null}

      {/* Showing This User All Accounts */}
      <div className="flex justify-center items-center gap-5 flex-wrap mt-10">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard
              account={account}
              key={account._id}
              deleteAccount={deleteAccount}
              setChangeAccount={setChangeAccount}
              setAccountId={setAccountId}
            />
          ))
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>

      {/* Showing Change Account Modal */}
      {changeAccount ? (
        <ChangeAccountModal
          setChangeAccount={setChangeAccount}
          accountId={accountId}
        />
      ) : null}
    </div>
  );
}

export default ManageAccountsPage;
