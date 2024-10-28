import { useCallback, useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Card from "./Card";

const MyMintedNFTs = () => {
  const [myMintedNFTs, setMyMintedNFTs] = useState([]);
  const { allNFTs, currentAccount } = useContext(TransactionContext);

  const getAllNFTs = useCallback(() => {
    if (allNFTs && currentAccount) {
      setMyMintedNFTs(
        allNFTs.filter(
          (nft) =>
            !nft.isListed &&
            !nft.isSold &&
            nft.owner.toLowerCase() == currentAccount.toLowerCase()
        )
      );
    }
  }, [allNFTs, currentAccount]);

  console.log(allNFTs)

  useEffect(() => {
    getAllNFTs();
  }, [getAllNFTs]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-8">My Minted NFTs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myMintedNFTs.length > 0 ? myMintedNFTs.map((nft) => (
          <div
            key={nft.tokenId}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <Card nft={nft} from="minted" /> 
          </div>
        )) : (
          <p>No NFTs are minted</p>
        )}
      </div>
    </div>
  );
};

export default MyMintedNFTs;
