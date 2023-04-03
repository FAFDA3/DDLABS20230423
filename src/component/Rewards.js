import React  , { useEffect,useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import Web3 from "web3";
import { truncateAddress } from '../utils/address';
import { useNavigate } from 'react-router-dom';
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








function Rewards() {
  const navigate = useNavigate();

  const { walletAddress, setWalletAddress } = useAppContext();
  const clearAccount = () => {
    setWalletAddress('');
  }

  const getAndSetAccount = async () => {
    const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWalletAddress(changedAccounts[0]);
  }

  const accountWasChanged = (accounts) => {
    setWalletAddress(accounts[0]);
  }

  window.ethereum.on('disconnect', clearAccount);
  window.ethereum.on('connect', getAndSetAccount);
  window.ethereum.on('accountsChanged', accountWasChanged);

  const gotoMintPage = () => {
    navigate('/mint');
  }





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
      const[mycount, setmycount] = useState(false);
      const[exp_air, setexp_air] = useState(false);
      const[nftown, setnftown] = useState();




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


          let nft_own = await welcomenft.balanceOf(walletAddress);
          console.log(nft_own);
          if (nft_own > 0){
            setnftown (true);
            console.log("you have an nft");
          }else {
            console.log("buy one nft");
            setnftown(false)}


          const isPR = await welcomenft.isPR(client_address);
          console.log(isPR);
          if (isPR == false) {
            const welcomeboard = await welcomenft.welcome(client_address);
            const _money = (await welcomeboard.money) / 1000000000000000000;
            console.log(_money);
            setmoney(_money);
          } else if (isPR == true) {
            const welcomeboard = await welcomenft.welcome_PR(client_address);
            const _money = (await welcomeboard.money) / 1;
            console.log(_money);
            setmoney(_money);
          }

          console.log(cost);
          set_nft_cost(cost / 1000000000000000000);

          console.log(n_address);
          for (let i = 0; i <= n_address + n_PR - 1; i++) {
            list[i] = await welcomenft.whitelist(i);
            console.log(list[i]);
            console.log("adding address");
          }

          setwhitelist(list);
          console.log(list);
          console.log("whitelist ready");
          prdata();
          console.log("data");

          setdata(true);


          let _exp_airdrop = await welcomenft.PR_exp_air(walletAddress);
          setexp_air(_exp_airdrop/1000000000000000000);


        };

        if(connected == false){
          connection();
        }




        async function prdata() {
              console.log("pr data");
              let pr_ = await welcomenft.PR(0);
              setpr_(pr_);
              console.log(pr_);




              let n_PR = await welcomenft.n_PR();
              console.log(n_PR);

              for (let i = 0; i <= n_PR -1 ; i++) {
                pr_list[i] = await welcomenft.PR(i);
                let countPR1_ = await welcomenft.countPR(pr_list[i]);
                countlist[i] = countPR1_/1;
              }
              setprlist(pr_list);
              console.log(pr_list);
              console.log(countlist);
              setcountPR(countlist);

              funmyscore()

            }





    if(connected == false){
      connection();

    }

    const [myscore, setmyscore] = useState();

    async function funmyscore() {
        let _myscore = await welcomenft.countPR(walletAddress);
        setmyscore(_myscore);
      }

    const retire_reward = async() =>{
      console.log("retire bitch");
        await welcomenft.retire_reward();


    }



          return (
            <>
              {(walletAddress != '' && walletAddress !== undefined && nftown == true) ? (
                <div className='mx-[60px] sm:rewards-content-sm rewards-content mt-[40px] justify-center p-20px'>
                  <div className='lg:w-1/3 sm:w-full md:w-1/3 justify-center'>
                    <div className='w-full h-full'>
                      <div className='w-full flex flex-row pl-[20px] h-[40px]'>
                        <div className='w-2/3'>
                          <label className='text-[28px] font-bold'>Leader Board</label>
                        </div>
                        <div className='w-1/3 flex justify-end'>
                          <label className='text-[28px] font-bold'>score</label>
                        </div>
                      </div>



                      <div className='w-full h-5/6 outline outline-2 outline-black mt-2 flex flex-nowrap overflow-auto' style={{ height: 'calc(100%-40px)' }}>
                      {countPR &&
                        <div className='w-full pl-[20px] h-full'>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[0]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[0]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[1]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[1]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[2]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[2]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[3]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[3]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[4]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[4]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[4]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[4]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[5]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[5]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[6]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[6]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[7]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[7]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[8]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[8]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[8]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[8]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[8]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[8]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[9]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[9]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[10]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[10]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[11]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[11]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[12]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[12]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[13]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[13]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[14]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[14]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[15]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[15]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[16]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[16]}</div>
                          </div>
                          <div className='w-full flex flex-row justify-between'>
                            <div className='text-[28px] truncate font-bold text-white mr-6'>{prlist[16]}</div>
                            <div className='text-[28px] font-bold text-white mr-3'>{countPR[16]}</div>
                          </div>
                        </div>

                      }


                      </div>
                    </div>
                  </div>
                  <div className='lg:w-1/3 sm:w-full md:w-1/3 rewards-middle justify-center'>
                    <div className='w-100 items-end flex flex-col justify-between'>
                      <div className='w-1/2 padding-40'>
                        <div className='text-xl font-bold wrap'>Your Wallet</div>
                        <div className='text-xl font-bold text-white'>{truncateAddress(walletAddress)}</div>
                        {myscore &&
                            <div className='text-xl font-bold mb-4'>SCORE - {myscore/1}</div>
                          }
                          <div>
                            <button className='text-xl font-bold outline outline-2 outline-black w-[120px] h-[32px]'>{money} wei</button>
                          </div >

                          <div className='w-1/2 padding-40'>

                              <button className='text-xl font-semibold outline outline-2 outline-black rounded-[18px] w-[160px] h-[32px] ml-4' onClick = {retire_reward}>CLAIM REWARD</button>

                          </div>

                      </div>

                    </div>
                  </div>

                  <div className='lg:w-1/3 sm:w-full md:w-1/3 justify-center items-baseline flex'>
                    <div className='w-1/2'>
                      <div className='padding-40'>
                        <div className='text-xl font-bold'>Expected airdrop rewards</div>
                        <div className='text-xl font-bold text-white'>REWARDS EARNED</div>

                        {exp_air &&
                            <div className='text-2xl font-bold text-white mt-8'>{exp_air } MATIC</div>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='sm:rewards-content-sm rewards-content justify-center items-center flex flex-col'>
                  <p className='text-2xl'>You must have a valid NFT to access rewards dashboard.</p>
                  <p className='text-xl'>Click below to go to the mint page</p>
                  <div className='items-end'>
                    <button className='bg-[#4d4d4d] rounded-lg w-[140px] h-[50px] text-white text-lg mt-6' onClick={gotoMintPage}>MINT PAGE</button>
                  </div>
                </div>
              )}

            </>
          )

}

export default Rewards
