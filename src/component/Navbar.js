import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import Web3 from "web3";
import toast from 'react-hot-toast';
import {truncateAddress} from '../utils/address';
import { useEffect, useState } from "react";
import abi from "../web3/ABI.json"
import { ethers } from "ethers";

const smart_contract = "0xEc9776C6Ce7D9C93a6C5B5d1791C84d53D735b55";

let signer;
let provider;
let client_address;
let welcomenft;
let n_address;
let n_PR;
let cost;







export const getShortAddress = (address, short = false) => {
  if (address == undefined || address == '') return '';
  return address.slice(0, short ? 5 : 10) + '...' + address.slice(address.length - 5, address.length);
}












function Navbar() {
  const { walletAddress, setWalletAddress } = useAppContext();
  const navigate = useNavigate();

  const [connected_, setconnection_] = useState(false);
  const [whitelist, setwhitelist] = useState();
  const [nft_cost, set_nft_cost] = useState();
  const [check1, setcheck1] = useState();
  const [check2, setcheck2] = useState();
  const [prlist, setprlist] = useState();

  const [pr_, setpr_] = useState();
  const [countPR, setcountPR] = useState();

  const [money, setmoney] = useState();

  const[data_obtained, setdata] = useState(false);
  const[hourglass_, sethourglass_] = useState(false);

  const connection = async () => {

      console.log("obtain the smart contract");

        //await window.ethereum.enable();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        client_address = await signer.getAddress();
        setconnection_(true);
        console.log(provider);

        welcomenft = new ethers.Contract(smart_contract, abi, signer);
        console.log(welcomenft);

        n_address = await welcomenft.n_whitelisted();
        n_PR = await welcomenft.n_PR();
        cost = await welcomenft.cost();

        const isPR = await welcomenft.isPR(client_address);
        console.log(isPR);
        if (isPR == false) {
          const welcomeboard = await welcomenft.welcome(client_address);
          const _money = (await welcomeboard.money) / 1000000000000000000;
          console.log(_money);
          setmoney(_money);
        } else if (isPR == true) {
          const welcomeboard = await welcomenft.welcome_PR(client_address);
          const _money = (await welcomeboard.money) / 1000000000000000000;
          console.log(_money);
          setmoney(_money);
        }

        console.log(cost);
        set_nft_cost(cost / 1000000000000000000);

        console.log(n_address);
        let list;
        for (let i = 0; i <= n_address + n_PR - 1; i++) {
          list[i] = await welcomenft.whitelist(i);
          console.log(list[i]);
          console.log("adding address");
        }

        setwhitelist(list);
        console.log(list);
        console.log("whitelist ready");

        console.log("data");

        setdata(true);
      };


  const onClickMain = () => {
    navigate('/');
  }

  const handleConnectWallet = () => {

    if (window.ethereum) {
      window.ethereum.request({
        method: 'eth_requestAccounts'
      })
        .then(async res => {
          console.log(' >>> Wallet Address >>> ', res[0]);
          setWalletAddress(res[0]);
          //setReadyToPay(true);
        })
    } else {
      toast.error('Metamask is not installed');
    }

    connection();


  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({
        method: 'eth_accounts'
      })
        .then(async res => {
          console.log(' >>> Wallet Address >>> ', res[0]);
          setWalletAddress(res[0]);
          //setReadyToPay(true);
        })
    }
  }, []);

  connection();

  return (



    <nav className="border-b md:shadow-lg items-center relative h-[90px] bg-white flex flex-row">
      <div className='pl-2 navbar w-1/3 space-x-6 justify-center items-center'>
        <a href='/mint'>MINT</a>
        <a href='/rewards'>REWARDS</a>
        <a href='/tryme'>TRY ME</a>
      </div>
      <div className='flex w-1/3 justify-center'>
        <img src='OD.png' className='max-w-[120px] max-h-[90px] cursor-pointer' onClick={onClickMain}></img>
      </div>
      <div className='cursor-pointer text-right flex flex-nowrap' onClick={connection}></div>
      {(walletAddress != undefined && walletAddress != "") ? (
        <div className="text-lg font-bold md:py-0 py-4 w-1/3 justify-center items-center flex navbar">
          <div
            style={{
              borderRadius: " 50px",
              overflow: "hidden",
              padding: "0px",
              margin: "0px",
              width: "30px",
              height: "30px",
              display: "inline-block",
              background: "rgb(200, 20, 59)",
            }}
          >
            <svg x="0" y="0" width="30" height="30">
              <rect
                x="0"
                y="0"
                width="30"
                height="30"
                transform="translate(-0.40947637363194944 -7.383047979261877) rotate(278.9 15 15)"
                fill="#F5DC00"
              ></rect>
              <rect
                x="0"
                y="0"
                width="30"
                height="30"
                transform="translate(-4.438295972664206 16.598233685650683) rotate(266.1 15 15)"
                fill="#1885F2"
              ></rect>
              <rect
                x="0"
                y="0"
                width="30"
                height="30"
                transform="translate(-26.953976728839613 -2.3223006953495564) rotate(242.8 15 15)"
                fill="#FB1849"
              ></rect>
            </svg>
          </div>
          <div className='text-right flex flex-nowrap ml-2'>{truncateAddress(walletAddress, true)}</div>
        </div>
      ) : (
        <div className="text-lg font-bold md:py-0 py-4 w-1/3 justify-center items-center flex navbar">
          <div className='cursor-pointer text-right flex flex-nowrap' onClick={handleConnectWallet}>CONNECT</div>

        </div>
      )}

    </nav>
  )
}

export default Navbar
