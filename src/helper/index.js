import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider
} from "@web3modal/ethereum";
import { configureChains, createClient } from 'wagmi'
import {
    arbitrum,
    avalanche,
    bsc,
    fantom,
    mainnet,
    optimism,
    polygon,
    goerli
} from "wagmi/chains";

const chains = [mainnet, goerli, polygon, optimism, arbitrum, avalanche, fantom, bsc];

export const projectId = process.env.REACT_APP_PROJECT_ID;

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

// 2. Configure wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
