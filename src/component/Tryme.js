import React from 'react'
import carGif from '../assets/Car.gif';
import sprayGif from '../assets/Spray.gif';
import abi from "../web3/ABI.json"
import { ethers } from "ethers";

function Tryme() {
  return (
    <>
      <div className='tryme-body'>
        <div className='tryme-response w-full'>
          <div className='basis-1/3 mx-auto flex justify-center items-center'>
            <div>
              <img src='/qrcode.png' className='mx-auto rounded-[16px] mt-10 w-[180px]'></img>
              <img src={carGif} className='mx-auto rounded-[16px] mt-5 w-[240px]'></img>
            </div>
          </div>
          <div className='basis-1/3 mx-auto  flex justify-center items-center'>
            <div>
              <img src='/qrcode.png' className='mx-auto rounded-[16px] mt-10 w-[180px]'></img>
              <img src={sprayGif} className='mx-auto rounded-[16px] mt-5 w-[240px]'></img>
            </div>
          </div>
          <div className='basis-1/3 mx-auto flex justify-center items-center p-10'>
            <video
              controls
              autoPlay
              muted
              className='tryme-video'
            >
              <source src='/try_me_video.mov' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tryme
