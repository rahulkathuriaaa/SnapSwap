import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai,
  baseGoerli,
} from "wagmi/chains";
import { useAccount, useBalance } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { Alchemy, Network } = require("alchemy-sdk");

const { chains, publicClient } = configureChains(
  [polygonMumbai, baseGoerli, mainnet, polygon, optimism, arbitrum, base, zora],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "SnapSwap",
  projectId: "YOUR_PROJECT_ID",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#18BB90" || "#0000",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "sans serif",
          overlayBlur: "small",
        })}
      >
        <Router>
          <App />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
    {/* <App /> */}
  </>
);
