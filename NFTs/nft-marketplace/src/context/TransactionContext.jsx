import React, { useEffect, useState } from "react";
import { ethers, parseEther } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;


const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum)
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {

  return (
    <TransactionContext.Provider
      value={{
        
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};