import React, { useState, useRef } from 'react';
import { Player } from 'video-react'
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


function Main() {


  const [connected, setconnection] = useState(false);
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

        await window.ethereum.enable();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        client_address = await signer.getAddress();
        setconnection(true);
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

        let list;
        console.log(n_address);
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

      if(connected == false){
        connection();
      }

  return (


    <>
        <div className='mx-8 main-body'>
          <video
            controls
            autoPlay
            muted
            className='main-body-background mb-4 ml-10 mr-10 h-200'
          >
            <source src='/main_page_video.mov' type='video/mp4' />
          </video>
          {/* <div className='main-body-background mt-2 mb-4 ml-2 mr-2'>
            <img src='/play.png' className='play-button'></img>
          </div> */}
        </div>
    </>
  )
}

export default Main
