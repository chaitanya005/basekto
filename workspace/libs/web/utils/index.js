import { ethers } from 'ethers';

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
                chainId: '0x89',
                rpcUrls: ['https://polygon-rpc.com/'],
                chainName: 'Matic Mainnet',
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.matic.network'],
            },
        ],
    });
};

export {
    switchNetwork, getNetwork
};