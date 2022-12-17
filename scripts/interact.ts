/*const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/Auction.sol/Auction.json");

const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const auction = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);*/

import { REACT_APP_ALCHEMY_KEY } from "../src/utils/envs";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);
const contractABI = require("../contracts/ABI/auctionABI.json");
const contractAddress = "0xfd3E5C401068F1d71afe79Ab35f8b99874FA11C8";
export const Auction = new web3.eth.Contract(contractABI, contractAddress);

/*export const login = async (address: string | null, password: string) => {
  const userLogged = await Auction.methods.login(address, password).call();
  console.log(userLogged);
  if (userLogged) {
    return userLogged;
  } else {
    console.log("User not logged");
  }
};

export const register = async (
  name: string,
  address: string | null,
  password: string
) => {
  const userRegisterd = await Auction.methods
    .register(address, name, password)
    .call();
  if (userRegisterd) {
    return userRegisterd;
  } else {
    console.log("User not registerd");
  }
};

export const createAuction = async () => {
  const auctionCreated = await Auction.methods.createAuction().call();
  if (auctionCreated) {
    return auctionCreated;
  } else {
    console.log("Auction not created");
  }
};*/
