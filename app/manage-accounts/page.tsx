"use client";

import AccountCard from "@/components/AccountCard";
import AddAccountModal from "@/components/AddAccountModal";
import { IAccount } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ManageAccountsPage() {
  // Get User Id From Next Auth
  const { data: session, status } = useSession();

  // Add Account Modal State
  const [isOpenAddAccountModal, setIsOpenAddAccountModal] =
    useState<boolean>(false);

  // Get All Account State
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  // Request For Get All Account
  useEffect(() => {
    if (status !== "authenticated") return;
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
  }, [status, session]);

  return (
    <div className="bg-slate-900 h-screen py-5">
      {/* Add Account Button */}
      <button
        onClick={() => setIsOpenAddAccountModal(!isOpenAddAccountModal)}
        className="bg-white py-2 px-6 font-semibold rounded mx-auto block cursor-pointer active:scale-95 transition-all duration-200"
      >
        Add Account
      </button>

      {/* Showing AddAccount Modal */}
      {isOpenAddAccountModal ? (
        <AddAccountModal setIsOpenAddAccountModal={setIsOpenAddAccountModal} />
      ) : null}

      {/* Showing This User All Accounts */}
      <div className="flex justify-center items-center gap-5 flex-wrap mt-10">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard account={account} key={account._id} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default ManageAccountsPage;
