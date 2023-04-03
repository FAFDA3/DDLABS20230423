import React from 'react'
import abi from "../web3/ABI.json"
import { ethers } from "ethers";









function PrivacyPolicy() {
  return (
    <>
      <div className='privacy-policy-body align-center items-center flex text-center flex-col'>
        <p className='text-4xl w-full text-left'>PRIVACY POLICY FOR ODLabs WEBSITE</p>
        <p className='text-2xl w-full text-left mt-2'>This Privacy Policy ("Policy") outlines how ODLabs ("we," "us," or "our") collects, uses, and protects your personal information when you use our website, located at [insert website URL], and any related services, applications, or tools (collectively, the "Website").</p>
        <p className='privacy-policy-section'>Collection of Information</p>
        <p className='privacy-policy-text'>1.1 We collect personal information from you when you voluntarily provide it to us, such as when you sign up for an account, purchase an NFT, or contact us with a question or comment. The personal information we collect may include your name, email address, mailing address, and payment information.</p>
        <p className='privacy-policy-text'>1.2 We may also collect information automatically when you use the Website, such as your IP address, browser type, device type, and operating system. This information is collected using cookies, web beacons, and other tracking technologies.</p>
        <p className='privacy-policy-section'>Use of Information</p>
        <p className='privacy-policy-text'>2.1 We use your personal information to provide the Website and any associated services, to process and fulfill your orders, to communicate with you about your account or orders, and to respond to your inquiries.</p>
        <p className='privacy-policy-text'>2.2 We may also use your personal information for marketing and promotional purposes, such as sending you newsletters or promotional offers, but we will only do so if you have given us your consent to receive such communications.</p>
        <p className='privacy-policy-text'>2.3 We may use the information we collect automatically to analyze Website usage, to improve the Website and any associated services, and to customize your user experience.</p>
        <p className='privacy-policy-section'>Protection of Information</p>
        <p className='privacy-policy-text'>3.1 We take reasonable measures to protect your personal information from unauthorized access, use, disclosure, or destruction. However, no data transmission over the internet or any wireless network can be guaranteed to be 100% secure, and we cannot guarantee the security of your personal information.</p>
        <p className='privacy-policy-text'>3.2 We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law or regulation.</p>
        <p className='privacy-policy-section'>Disclosure of Information</p>
        <p className='privacy-policy-text'>4.1 We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide the Website and any associated services or as required by law</p>
        <p className='privacy-policy-text'>4.2 We may disclose your personal information to our service providers, such as payment processors, shipping providers, or marketing partners, but only to the extent necessary to provide the services you have requested.</p>
        <p className='privacy-policy-text'>4.3 We may also disclose your personal information if we believe it is necessary to comply with a legal obligation, to protect our rights or property, or to prevent fraud or other illegal activity.</p>
        <p className='privacy-policy-section'>Your Rights</p>
        <p className='privacy-policy-text'>5.1 You have the right to access, update, and correct your personal information that we hold about you. You may also request that we delete your personal information or restrict its processing.</p>
        <p className='privacy-policy-text'>5.2 To exercise your rights, please contact us at hello@odlabs.io. We will respond to your request within a reasonable timeframe and in accordance with applicable law.</p>
        <p className='privacy-policy-section'>Changes to Policy</p>
        <p className='privacy-policy-text'>6.1 We may update this Policy from time to time by posting a new version on the Website. You should check this page regularly to ensure you are familiar with any changes.</p>
        <p className='privacy-policy-section'>Contact Us</p>
        <p className='privacy-policy-text mb-4'>7.1 If you have any questions or concerns about this Policy or our privacy practices, please contact us at hello@odlabs.io.</p>
      </div>
    </>
  )
}

export default PrivacyPolicy
