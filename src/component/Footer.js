import React from 'react'
import './responsive.css'
import { useNavigate } from 'react-router-dom'
import abi from "../web3/ABI.json"
import { ethers } from "ethers";

function Footer() {

  const navigate = useNavigate();
  const handleClickTerms = () => {
    navigate('/term');
  }
  const handleClickPrivacy = () => {
    navigate('/privacypolicy');
  }
  return (
    <div className='footer mt-3'>
        <div className='footer-body'>
            <div className='w-1/3'>
                <img src = 'odlabs.png'></img>
            </div>
            <div className='w-1/3 flex flex-row justify-between'>
                <div></div>
                <div className='cursor-pointer' onClick={handleClickTerms}>TERM & CONDITIONS</div>
                <div className='cursor-pointer' onClick={handleClickPrivacy}>PRIVACY</div>
                <div></div>
            </div>
            <div className='w-1/3 flex flex-nowrap justify-center text-lg space-x-8'>
                <img src = 'icon2.png' className='h-[30px]'></img>
                <img src = 'icon3.png' className='h-[30px]'></img>
                <img src = 'icon1.png' className='h-[30px]'></img>
            </div>
        </div>
    </div>
  )
}

export default Footer
