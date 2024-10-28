import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { parseEther, parseUnits } from "ethers";

const Card = ({ nft,from }) => {

  const {listNFT,currentAccount, buyNFT} = useContext(TransactionContext)

  const handleList = async () => {
    await listNFT(nft.tokenId.toString());
  }

  const hanleBuy = async () => {
    await buyNFT(nft.tokenId.toString(), nft.price.toString())
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={nft.url} alt={`NFT ${nft.tokenId.toString()}`} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            NFT #{nft.tokenId.toString()}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Owner: {nft.owner.slice(0, 5) + '...' + nft.owner.slice(-5)}
        <br />
          Price: {parseUnits(nft.price.toString(),"wei").toString()} WEI
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {nft.description ? nft.description : "No description available."}
        </p>
        <button
          onClick={from == "minted" ? handleList : from == "listed" ? (nft.owner.toString().toLowerCase() != currentAccount.toLowerCase() ? hanleBuy : ()=>{}) : "" }
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {from == "minted" ? "List" : from == "listed" ? (nft.owner.toString().toLowerCase() != currentAccount.toLowerCase()  ? "Buy" : "My" ) : ""}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
