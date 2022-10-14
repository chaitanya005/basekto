import { ethers } from 'ethers';

const getBalance = async () => {

    const [address] = await window?.ethereum?.request({
        method: 'eth_requestAccounts',
    });

    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
};

const getNetwork = () => {

    return ethers.providers.getNetwork(
        Number(window?.ethereum?.chainId)
    );
};

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
    getBalance, getNetwork,
    switchNetwork
};