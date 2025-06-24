"use client";

import Navbar from "@/components/Navbar";
import { useAccount } from "@/context/AccountContext";
import { IAccount } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [account, setAccount] = useState<IAccount | null>(null);

  // Get Account ID From Localstorage By Context
  const { accountId } = useAccount();

  useEffect(() => {
    // Check Account ID
    if (!accountId) return;

    // Request To Backend
    const getAccountData = async () => {
      try {
        const { data } = await axios.get(`/api/accounts/${accountId}`);
        // Set AccountInfo To State
        setAccount(data.account);
      } catch (error) {
        console.error(error);
      }
    };

    getAccountData();
  }, [accountId]);

  return (
    <div>
      <Navbar account={account} />
    </div>
  );
}

export default DashboardPage;
