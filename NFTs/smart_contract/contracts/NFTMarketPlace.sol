// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    event NFTMinted(uint tokenId);
    event NFTListed(uint tokenId);
    event NFTSold(uint tokenId);

    uint listingFee = 35000 gwei;
    uint private _tokenId = 0;

    struct NFT {
        uint tokenId;
        string name; // Added name field
        string url;  // This can be the image URL
        string description; // Added description field
        address payable owner;
        uint price;
        bool isListed;
        bool isSold;
    }

    mapping(uint => NFT) public nfts;

    constructor() ERC721("SCUBI", "SCB") Ownable(msg.sender) {}

    function mintNFT(string memory _name, string memory _tokenURI, string memory _description) external returns (uint) {
        _tokenId++;
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        nfts[_tokenId] = NFT({
            tokenId: _tokenId,
            name: _name, // Set the NFT name
            url: _tokenURI,
            description: _description, // Set the NFT description
            owner: payable(msg.sender),
            price: 0,
            isListed: false,
            isSold: false
        });

        emit NFTMinted(_tokenId);
        return _tokenId;
    }

    function listNFT(uint _itemId, uint _price) external payable {
        require(!nfts[_itemId].isListed, "NFT already listed");
        require(msg.sender == nfts[_itemId].owner, "Only owner can list NFT");
        require(_price > 0, "Price must be greater than 0");
        require(msg.value >= listingFee, "Insufficient funds for listing fee");

        nfts[_itemId].price = _price;
        nfts[_itemId].isListed = true;
        nfts[_itemId].isSold = false;

        emit NFTListed(_itemId);
    }

    function buyNFT(uint _itemId) external payable {
        require(!nfts[_itemId].isSold, "NFT already sold");
        require(nfts[_itemId].isListed, "NFT is not listed for sale");
        require(msg.value >= nfts[_itemId].price, "Insufficient funds");

        address seller = nfts[_itemId].owner;
        nfts[_itemId].owner = payable(msg.sender);
        nfts[_itemId].isListed = false;
        nfts[_itemId].isSold = true;

        _transfer(seller, msg.sender, _itemId);
        payable(seller).transfer(msg.value);

        emit NFTSold(_itemId);
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getAllNFTS() public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](_tokenId);
        uint index = 0;
        for (uint i = 1; i <= _tokenId; i++) {
            result[index] = nfts[i];
            index++;
        }
        return result;
    }

    function getAllListedNFTs() public view returns (NFT[] memory) {
        uint listedCount = 0;
        for (uint i = 1; i <= _tokenId; i++) {
            if (nfts[i].isListed) {
                listedCount++;
            }
        }

        NFT[] memory listedNFTs = new NFT[](listedCount);
        uint index = 0;
        for (uint i = 1; i <= _tokenId; i++) {
            if (nfts[i].isListed) {
                listedNFTs[index] = nfts[i];
                index++;
            }
        }
        return listedNFTs;
    }

    function getAllSoldNFTs() public view returns (NFT[] memory) {
        uint soldCount = 0;
        for (uint i = 1; i <= _tokenId; i++) {
            if (nfts[i].isSold) {
                soldCount++;
            }
        }

        NFT[] memory soldNFTs = new NFT[](soldCount);
        uint index = 0;
        for (uint i = 1; i <= _tokenId; i++) {
            if (nfts[i].isSold) {
                soldNFTs[index] = nfts[i];
                index++;
            }
        }
        return soldNFTs;
    }
}
