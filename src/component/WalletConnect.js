import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { ethereumClient, projectId } from "../helper";
import { ethers } from "ethers";


export default function WalletConnect() {
  return (
    <div className="Wallet_connect_card">
      <h2 className="title">Wallet connect</h2>
      <div className="container">
        <Web3Button className='wallet_button' icon="show" label="Connect Wallet" balance="show" />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

        <div className="change_network">
        <Web3NetworkSwitch />

        </div>
      </div>
    </div>
  );
}
