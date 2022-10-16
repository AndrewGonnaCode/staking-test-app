import { useEthers } from "@usedapp/core";
import React from "react";

const ConnectWallet = () => {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <button
      onClick={() => activateBrowserWallet()}
      className={`ml-3 inline-flex rounded-md shadow
     items-center justify-center rounded-md border border-transparent 
     bg-white px-5 py-3 text-base font-medium 
     text-indigo-600 hover:bg-indigo-50`}
    >
      {account
        ? `${account.slice(0, 3)}...${account.slice(
            account.length - 3,
            account.length
          )}`
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
