"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AccountContextType = {
  accountId: string | null;
  setAccountIdFn: (id: string) => void;
};

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("accountId");
    if (saved) {
      setAccountId(saved);
    }
  }, []);

  const setAccountIdFn = (id: string) => {
    localStorage.setItem("accountId", id);
    setAccountId(id);
  };

  return (
    <AccountContext.Provider value={{ accountId, setAccountIdFn }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount faqat AccountProvider ichida ishlatiladi");
  }
  return context;
};
