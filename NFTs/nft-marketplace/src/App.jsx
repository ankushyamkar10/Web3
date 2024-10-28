// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Navbar from './components/Navbar'
// import ListedNFTs from './components/ListedNFTS'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
   
//    <div className=""><Navbar />
//    <ListedNFTs /></div>
//   )
// }

// export default App


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ListedNFTs from "./components/ListedNFTs";
import SoldNFTs from "./components/SoldNFTs";
import MyMintedNFTs from "./components/MyMintedNFTs";
import MintNFT from "./components/MintNFT";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listed" element={<ListedNFTs />} />
        <Route path="/sold" element={<SoldNFTs />} />
        <Route path="/minted" element={<MyMintedNFTs />} />
        <Route path="/mint" element={<MintNFT />} />
      </Routes>
    </Router>
  );
}

export default App;
