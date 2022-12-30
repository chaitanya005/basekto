import { ethers } from 'ethers';
import axios from 'axios';

const getBalance = async () => {

    const [address] = await window?.ethereum?.request({
        method: 'eth_requestAccounts',
    });

    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
};

const getNetwork = async () => {

    const chainId = Number(window?.ethereum?.chainId);
    const chains = await (await axios.get('https://chainid.network/chains.json')).data;
    return chains.find(chain => chain.chainId === chainId);
};

const getProvider = (network) => {

    try {
        return new ethers.providers.Web3Provider(window?.ethereum, network);
    } catch (err) {
        return null;
    }
};

const ethAddEventListener = (event, cb) => {

    if (typeof window === 'undefined') {
        return;
    }
    window?.ethereum?.on(event, cb);
    return () => window?.ethereum?.removeListener(event, cb);
}

const switchNetwork = () => {

    window?.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: '0x13881',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                chainName: 'Polygon Mumbai',
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                blockExplorerUrls: ['https://polygonscan.com/'],
            },
        ],
    });

    // window?.ethereum?.request({
    //     method: 'wallet_addEthereumChain',
    //     params: [
    //         {
    //             chainId: '0x89',
    //             rpcUrls: ['https://polygon-rpc.com/'],
    //             chainName: 'Matic Mainnet',
    //             nativeCurrency: {
    //                 name: 'MATIC',
    //                 symbol: 'MATIC',
    //                 decimals: 18,
    //             },
    //             blockExplorerUrls: ['https://explorer.matic.network'],
    //         },
    //     ],
    // });
};

export {
    ethAddEventListener,
    getBalance,
    getNetwork,
    getProvider,
    switchNetwork,
};