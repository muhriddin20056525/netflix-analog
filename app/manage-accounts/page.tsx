"use client";

import AddAccountModal from "@/components/AddAccountModal";
import { useState } from "react";

function ManageAccountsPage() {
  const [isOpenAddAccountModal, setIsOpenAddAccountModal] =
    useState<boolean>(false);

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
    </div>
  );
}

export default ManageAccountsPage;
