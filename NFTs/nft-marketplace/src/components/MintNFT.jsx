import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const MintNFTForm = ({ onMint }) => {
  const [nftName, setNftName] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [nftDescription, setNftDescription] = useState("");

  const {mintNFT} = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nftData = {
      name: nftName,
      image: nftImage,
      description: nftDescription,
    };
    
    mintNFT(nftData);
    
    setNftName("");
    setNftImage("");
    setNftDescription("");
  };

  return (
    <form className="max-w-lg mx-auto my-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Mint Your NFT</h2>
      <div className="mb-4">
        <label htmlFor="nftName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          NFT Name
        </label>
        <input
          type="text"
          id="nftName"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nftImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL
        </label>
        <input
          type="url"
          id="nftImage"
          value={nftImage}
          onChange={(e) => setNftImage(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nftDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="nftDescription"
          value={nftDescription}
          onChange={(e) => setNftDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Mint NFT
      </button>
    </form>
  );
};

export default MintNFTForm;
