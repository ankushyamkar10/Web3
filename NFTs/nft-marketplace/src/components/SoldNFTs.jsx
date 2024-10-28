import React, { useContext } from "react";
import Card from "./Card";
import { TransactionContext } from "../context/TransactionContext";

const SoldNFTs = () => {
  const { soldNFTs } = useContext(TransactionContext); // Get sold NFTs from context

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 my-8 px-4 md:px-8">
      {soldNFTs.length > 0 ? (
        soldNFTs.map((nft) => (
          <div key={nft.tokenId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <Card nft={nft} from="sold"/> {/* Pass nft data to Card component */}
          </div>
        ))
      ) : (
        <p>No NFTs have been sold yet.</p> // Message when no NFTs are sold
      )}
    </div>
  );
};

export default SoldNFTs;
