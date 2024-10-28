import React, { useEffect, useState } from "react";
import { ethers, parseEther, parseUnits } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allNFTs, setAllNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [soldNFTs, setSoldNFTs] = useState([]);
  const listingFee = ethers.parseUnits("35000", "gwei");

  const connectWallet = async () => {
    if (!ethereum) return alert("Please install MetaMask.");

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        await getAllNFTs();
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Fetch all NFTs (listed and sold)
  const getAllNFTs = async () => {
    try {
      const transactionsContract = await createEthereumContract();

      const allNFTsData = await transactionsContract.getAllNFTS();
      console.log(allNFTs);

      const structuredNFTs = allNFTsData
        ? allNFTsData.map((nft) => {
          console.log(nft)
            return {
              tokenId: nft.tokenId,
              url: nft.url,
              owner: nft.owner,
              price: parseUnits(nft.price.toString()),
              isListed: nft.isListed,
              isSold: nft.isSold,
              description : nft.description,
              name : nft.name
            };
          })
        : [];

      setAllNFTs(structuredNFTs);
      setListedNFTs(structuredNFTs.filter((nft) => nft.isListed));
      setSoldNFTs(structuredNFTs.filter((nft) => nft.isSold));
    } catch (error) {
      console.error("Error fetching all NFTs:", error);
    }
  };

  const mintNFT = async (nftData) => {
    if (!nftData) return alert("Data must not be empty.");

    const { name, image, description } = nftData;

    const tokenURI = image;

    try {
      const transactionsContract = await createEthereumContract();

      const tx = await transactionsContract.mintNFT(
        name,
        tokenURI,
        description
      );
      await tx.wait();
      console.log("NFT Minted:", tx);

      await getAllNFTs();
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const listNFT = async (itemId, price= 0.000001) => {
    try {
      const transactionsContract = await createEthereumContract();
      const tx = await transactionsContract.listNFT(
        itemId,
        parseEther(price.toString()),
        {
          value: listingFee,
        }
      );
      await tx.wait();
      console.log("NFT Listed:", tx);
      await getAllNFTs(); // Refresh NFTs after listing
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  const buyNFT = async (itemId, price) => {
    try {
      const transactionsContract = await createEthereumContract();
      const tx = await transactionsContract.buyNFT(itemId, {
        value: ethers.parseUnits(price, "gwei"),
      });
      await tx.wait();
      console.log("NFT Bought:", tx);
      await getAllNFTs(); // Refresh both listed and sold NFTs after purchase
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  useEffect(() => {
    if (ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        allNFTs,
        listedNFTs,
        soldNFTs,
        mintNFT,
        listNFT,
        buyNFT,
        getAllNFTs,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
