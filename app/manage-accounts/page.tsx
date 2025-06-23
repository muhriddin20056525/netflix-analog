"use client";

import AccountCard from "@/components/AccountCard";
import AddAccountModal from "@/components/AddAccountModal";
import ChangeAccountModal from "@/components/ChangeAccountModal";
import Loader from "@/components/Loader";
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
