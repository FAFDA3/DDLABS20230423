import React, { useEffect,useState, useRef } from 'react';
import './responsive.css'

import hourglass from "./hourglass.gif";
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


function Mint() {


  ///GET THE COLLECTION ADDRESS AND ID FROM link
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlParams2 = new URLSearchParams(queryString);
  const _collec_url = urlParams.get("_collec_url"); //link example ?_collec_url=0x039e2e1DdaCA62Eb760b28C2c18e0f46eB165E26
  const _ID_url = urlParams2.get("_ID_url");
  const _ID_url2 = urlParams2.get("_ID_url2");



  const [showModal, setShowModal] = React.useState(false);

  const handleClickAR = () => {
    setShowModal(true);
  };


  let list = [];
    let pr_list = [];
    let countlist = [];

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

    const checkdata = async () => {
      console.log("checkdata");
      let input = document.getElementById("_ID_url")?.value;
      let input2 = document.getElementById("_ID_url2")?.value;
      console.log(input);
      console.log(input2);

      if (input != "") {
        let _check1 = await welcomenft.isWhitelisted(input);
        console.log("checking...");
        console.log(_check1);
        if (_check1 == true) {
          console.log("address 1 whitelisted");
          setcheck1(true);
        }
        if (_check1 == false) {
          console.log("address 1 not whitelisted");

          setcheck1(false);
        }
      }

      if (input2 != "") {
        let _check2 = await welcomenft.isWhitelisted(input2);
        if (_check2 == true) {
          console.log("address 2 whitelisted");
          setcheck2(true);
        }

        if (_check2 == false) {
          console.log("address 2 not whitelisted");

          setcheck2(false);
        }
      }

      else{
        console.log("empty input");
      }


    };

    // funzione clessidra
    const startTimer = () => {
      // codice per far girare la clessidra
      console.log("working...");
      return (
        <div id="gif-container">
          <img src={hourglass} id="gif" alt="animated gif"></img>
        </div>
      );
    };

    const returndata = async () => {
      //const intervalId = setInterval(startTimer, 10000000000000000);
      //startTimer();


      let input = document.getElementById("_ID_url").value;
      let input2 = document.getElementById("_ID_url2").value;
      let _check1 = await welcomenft.isWhitelisted(input);
      let _check2 = await welcomenft.isWhitelisted(input2);

      if (_check1 == true) {
        //console.log("address 1 whitelisted");
        setcheck1(true);
      }
      if (_check1 == false) {
        setcheck1(false);
      }

      if (_check2 == true) {
        //console.log("address 2 whitelisted");
        setcheck2(true);
      }

      if (_check2 == false) {
        setcheck2(false);
      }

      if (_check1 != true && _check2 != true) {
        try{
            sethourglass_(true);
            await welcomenft.mint(1, input, input2, { value: cost, gasLimit: 10000000 })
            .then(() => {
                  sethourglass_(false);
                  })
                  .catch((err) => {
                  console.error(err);

                  });
          }catch(err){
              console.log(err);

          }
      }

      //console.log(input);
      //console.log(input2);
      //clearInterval(intervalId);



    };
    useEffect(()=>{
      checkdata()
    },[check1,check2])

    const intervalId = setInterval(checkdata, 10000);


    async function resetconn() {
      setdata(false);
    }








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

      if(connected == false){
        connection();
      }


      const [trans_res, set_trans] = useState();

     const getTransactionResult_ = async() =>{

         let input = document.getElementById("_ID_url").value;
         let input2 = document.getElementById("_ID_url2").value;
         console.log(input);
         console.log(input2);
         await getTransactionResult(welcomenft, input, input2, cost);

     }

     async function getTransactionResult(contract, input1, input2, cost) {
      set_trans(false);
      console.log("start mint");
      //await welcomenft.mint(1, input1, input2, { value: cost, gasLimit: 10000000 })

      // Estimate the gas needed for the mint() function
      // const gasEstimate = await contract.estimate.mint(1, input1, input2, { value: cost });
      //
      // // Prepare the options for the transaction
      // const options = {
      //     gasLimit: gasEstimate,
      //     value: cost
      // };


      console.log("txPromise");
      // Call the mint() function on the contract
      const txPromise = await welcomenft.mint(1, input1, input2, { value: cost, gasLimit: 10000000 })
      //const txPromise = await welcomenft.mint(1, input1, input2, options);
      console.log(txPromise);


      // Wait for the transaction to be mined
      const receipt = await txPromise.wait();

      // Get the transaction status (true if success, false if failure)
      const status = receipt.status;

      // Get the output of the transaction, if any
      const output = receipt.logs[0].data;

      console.log("status: ");
      console.log(status);
      set_trans(status);
      console.log(trans_res);

      return {status, output};

  }


  console.log(welcomenft);
  return (


    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    SCAN QR CODE
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <img src='/qrcode.png' className='rounded-xl mx-auto'></img>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className='mint-body min-h-fit'>
        <div className='basis-1/3 justify-center items-center flex flex-col'>
          <div className='text-div-right font-bold text-6xl'>Properties</div>
          <div className='text-div-right font-semibold mt-12 text-4xl'>Composition</div>
          <div className='mt-4 flex flex-nowrap text-[24px]'>
            <div className='text-right pr-6'>
              <div>Cerebellum</div>
              <div>Brain stem</div>
              <div>Temporal Lobe</div>
              <div>Occipital Lobe</div>
              <div>Parietal Lobe</div>
              <div>Frontal Lobe</div>
              <div>Pineal Glands</div>
              <div>Broca</div>
              <div>Teeth</div>
            </div>
            <div className='font-semibold'>
              <div>: Mint</div>
              <div>: Blue</div>
              <div>: Orange</div>
              <div>: Dark Blue</div>
              <div>: Yellow</div>
              <div>: Red</div>
              <div>: Green</div>
              <div>: Red</div>
              <div>: White</div>
            </div>
          </div>
        </div>
        <div className='basis-1/3 w-full justify-center items-center flex'>
          <div className='w-full'>
            <div className='mint-body-image'>
              <video
                controls
                autoPlay
                muted
                className='rounded-xl mx-auto h-[100%]'
              >
                <source src='/nft_preview.mov' type='video/mp4' />
              </video>
            </div>
            <div className='flex justify-center mb-1 cursor-pointer' onClick={handleClickAR}>
              <img src='/icon4.png'></img>
            </div>
          </div>

        </div>
        <div className='basis-1/3 ml-4 justify-center items-center flex'>
          <div className='w-full'>
            <div className='text-div-left font-bold text-6xl'>LULU</div>
            <div className='text-div-left font-bold text-4xl'>1 of 10,000</div>
            <div className='text-div-left mt-8 text-lg font-semibold	max-w-[500px] min-w-[300px] mint-text'>
              <div>LULU Monster</div>
              <div>
                The first on chain "Mixed Reality" collectible.
                A new world of possibility awaits you through
                the magic of Mixed Reality, LULU will be your
                companion and show you this new world.
              </div>
              <div className='mt-6'>
                A new journey awaits you!
              </div>
              <div className='mt-3 w-full'>
                <div className='items-end w-5/6 justify-center items-center flex'>
                  <p className='text-sm text-gray-600'>Refer two(2) valid wallets to mint</p>
                </div>
                <div className='w-full flex flex-row'>
                  <input className='w-5/6 mr-3 rounded-md bg-transparent border-2 border-black p-0.5 pl-1' id="_ID_url" value={_ID_url}></input>
                  {check1 == false && (
                                         <img src="green_check.png" width={36} height={32}></img>
                                       )}
                   {check1 == true && (
                                            <img src="red_X.png" width={36} height={32}></img>
                                        )}

                </div>
                <div className='w-full flex flex-row mt-1'>
                  <input className='w-5/6 mr-3 rounded-md bg-transparent border-2 border-black p-0.5 pl-1' id="_ID_url2" value={_ID_url2}></input>
                  {check2 == false && (
                                         <img src="green_check.png" width={36} height={32}></img>
                                       )}
                   {check2 == true && (
                                            <img src="red_X.png" width={36} height={32}></img>
                                        )}
                </div>
              </div>
              <div className='w-5/6 items-end justify-center items-center flex'>
                <button className='bg-[#4d4d4d] rounded-lg w-[120px] h-[40px] text-white text-lg mt-3' onClick = {getTransactionResult_}>MINT</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Mint
