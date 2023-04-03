import React from 'react'
import abi from "../web3/ABI.json"
import { ethers } from "ethers";

function TermsAndCondition() {
  return (
    <>
      <div className='privacy-policy-body align-center items-center flex text-center flex-col'>
        <p className='text-4xl w-full text-left'>TERMS AND CONDITIONS FOR ODLabs NFT PROJECT</p>
        <p className='text-2xl w-full text-left mt-2'>Please carefully read the following terms and conditions ("Terms") governing the use of the ODLabs NFT project ("Project") and its associated non-fungible tokens ("NFTs").</p>
        <p className='privacy-policy-section'>Ownership of NFTs</p>
        <p className='privacy-policy-text'>1.1 The NFTs are unique digital assets that are part of the ODLabs NFT collection. Each NFT is unique and represents a distinct ownership interest in the Project.</p>
        <p className='privacy-policy-text'>1.2 You acknowledge that ownership of an NFT does not confer any rights or interests in the underlying assets or intellectual property associated with the Project or any other ODLabs NFTs.</p>
        <p className='privacy-policy-text'>1.3 You agree that you will not attempt to copy, reproduce, sell, or otherwise transfer ownership of an NFT without the express written consent of ODLabs.</p>
        <p className='privacy-policy-section'>Use of NFTs</p>
        <p className='privacy-policy-text'>2.1 You may use your NFTs for personal, non-commercial purposes, subject to these Terms.</p>
        <p className='privacy-policy-text'>2.2 You agree not to use your NFTs in any way that violates applicable law, infringes any intellectual property or other rights of any third party, or is harmful, abusive, harassing, or otherwise offensive.</p>
        <p className='privacy-policy-text'>2.3 You acknowledge and agree that ODLabs may, in its sole discretion, modify or update the functionality or features of the NFTs, and that you have no right to demand or expect any particular functionality or features.</p>
        <p className='privacy-policy-section'>Prohibited Conduct</p>
        <p className='privacy-policy-text'>3.1 You agree not to engage in any of the following activities, which are strictly prohibited:</p>
        <p className='privacy-policy-subtext'>(a) Reverse engineering, decompiling, or disassembling any portion of the NFTs or the Project;</p>
        <p className='privacy-policy-subtext'>(b) Creating, distributing, or promoting any unauthorized software or tools designed to modify or interact with the NFTs or the Project;</p>
        <p className='privacy-policy-subtext'>(c) Engaging in any fraudulent activity, including without limitation the creation or distribution of counterfeit or otherwise unauthorized NFTs;</p>
        <p className='privacy-policy-subtext'>(d) Using the NFTs or the Project for any illegal or unauthorized purpose, including without limitation money laundering, terrorist financing, or other criminal activity;</p>
        <p className='privacy-policy-subtext'>(e) Any other activity that ODLabs determines, in its sole discretion, to be harmful or detrimental to the Project or the ODLabs community.</p>
        <p className='privacy-policy-section'>AR Activation</p>
        <p className='privacy-policy-text'>4.1 Each NFT in the ODLabs collection includes an exclusive AR activation that is unique to that particular NFT.</p>
        <p className='privacy-policy-text'>4.2 You acknowledge that the AR activation is an integral part of the value and uniqueness of the NFT, and that the activation cannot be transferred or used independently of the NFT.</p>
        <p className='privacy-policy-text'>4.3 ODLabs makes no guarantees or warranties as to the functionality or availability of the AR activation associated with an NFT.</p>
        <p className='privacy-policy-section'>Limitations on Use</p>
        <p className='privacy-policy-text'>5.1 You agree that you will not use an NFT or the associated AR activation in any way that violates applicable law or infringes the rights of any third party.</p>
        <p className='privacy-policy-text'>5.2 You agree that you will not use an NFT or the associated AR activation in any way that is harmful, abusive, harassing, or otherwise offensive.</p>
        <p className='privacy-policy-text'>5.3 You acknowledge that ODLabs reserves the right to revoke your ownership of an NFT and/or disable the associated AR activation if you violate these Terms or engage in any conduct that ODLabs determines, in its sole discretion, is detrimental to the Project or the ODLabs community.</p>

        <p className='privacy-policy-section'>Disclaimers and Limitations of Liability</p>
        <p className='privacy-policy-text'>6.1 ODLabs makes no warranties, express or implied, as to the accuracy, reliability, or completeness of any information or content associated with the Project or any NFTs.</p>
        <p className='privacy-policy-text'>6.2 ODLabs is not responsible for any loss or damage incurred by you as a result of your ownership or use of an NFT or the associated AR activation.</p>
        <p className='privacy-policy-text'>6.3 In no event shall ODLabs be liable for any indirect, special, incidental, or consequential damages arising out of or in connection with your ownership or use of an NFT or the associated AR activation.</p>

        <p className='privacy-policy-section'>Governing Law and Jurisdiction</p>
        <p className='privacy-policy-text'>7.1 These Terms shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any principles of conflicts of law.</p>
        <p className='privacy-policy-text'>7.2 You agree that any legal action or proceeding arising out of or in connection with these Terms shall be brought exclusively in the state or federal courts located in San Francisco, California.</p>

        <p className='privacy-policy-section'>Changes to Terms</p>
        <p className='privacy-policy-text'>8.1 ODLabs reserves the right to modify or update these Terms at any time, with or without notice.</p>
        <p className='privacy-policy-text'>8.2 Your continued ownership or use of an NFT after any modifications or updates to these Terms shall constitute your acceptance of the modified or updated Terms.</p>
        <p className='privacy-policy-text mb-4'>By purchasing an ODLabs NFT, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree to these Terms, you should not purchase or use an NFT.</p>

      </div>
    </>
  )
}

export default TermsAndCondition
