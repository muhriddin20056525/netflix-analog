"use client";

import Navbar from "@/components/Navbar";
import { IAccount } from "@/types";
import axios from "axios";
import { use, useEffect, useState } from "react";

function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const [account, setAccount] = useState<IAccount | null>(null);

  const { id } = use(params);

  useEffect(() => {
    // Check Account ID
    if (!id) return;

    // Request To Backend
    const getAccountData = async () => {
      try {
        const { data } = await axios.get(`/api/accounts/${id}`);
        // Set AccountInfo To State
        setAccount(data.account);
      } catch (error) {
        console.error(error);
      }
    };

    getAccountData();
  }, [id]);

  return (
    <div>
      <Navbar account={account} />
    </div>
  );
}

export default DashboardPage;
