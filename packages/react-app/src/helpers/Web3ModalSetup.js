import WalletConnectProvider from "@walletconnect/web3-provider"
import Authereum from "authereum"
import { ALCHEMY_KEY, INFURA_ID } from "../constants"
import { SafeAppWeb3Modal } from "@gnosis.pm/safe-apps-web3modal"

/**
  Web3 modal helps us "connect" external wallets:
**/
const web3ModalSetup = () =>
    new SafeAppWeb3Modal({
        network: "mainnet",
        cacheProvider: true,
        theme: "dark",
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    bridge: "https://polygon.bridge.walletconnect.org",
                    infuraId: INFURA_ID,
                    rpc: {
                        10: "https://mainnet.optimism.io",
                        100: "https://rpc.gnosischain.com",
                        137: "https://polygon-rpc.com",
                        31337: "http://localhost:8545",
                        42161: "https://arb1.arbitrum.io/rpc",
                        80001: "https://rpc-mumbai.maticvigil.com",
                        71401: "https://godwoken-testnet-v1.ckbapp.dev"
                    }
                }
            }
        }
    })

export default web3ModalSetup
