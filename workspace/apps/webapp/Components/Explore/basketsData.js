const basketsData = [
    {
        name: 'Defi basket',
        symbol: 'DEFIB',
        description: 'The DeFi is a capitalization-weighted Basket that tracks the performance of decentralized financial asset.',
        growthRate: 2.34,
        image: 'https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg',
        coins: [
            {
                id: 'uniswap',
                name: 'Uniswap',
                weight: 45,
                symbol: 'UNI',
                image: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni.svg'
            },
            {
                id: 'aave',
                name: 'Aave Token',
                weight: 55,
                symbol: 'AAVE',
                image: 'https://set-core.s3.amazonaws.com/img/coin-icons/aave.svg',
            }
        ],
        accountId: '34895743986473'
    }
];

export default basketsData;