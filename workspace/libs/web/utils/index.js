import { getRequest } from 'apps/webapp/axios';
import axios from 'axios';
import { ethers } from 'ethers';

const getBalance = async () => {
  const [address] = await window?.ethereum?.request({
    method: 'eth_requestAccounts',
  });

  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

const getChainId = async () => {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const { chainId } = await provider.getNetwork();
  return chainId;
};

const getNetwork = async () => {
  const chainId = await getChainId();
  const chains = await (
    await axios.get('https://chainid.network/chains.json')
  ).data;
  return chains.find((chain) => chain.chainId === chainId);
};

const getProvider = (network) => {
  try {
    return new ethers.providers.Web3Provider(window?.ethereum, network);
  } catch (err) {
    return null;
  }
};

const isValidNetwork = async () => {
  const chainId = await getChainId();
  return process.env.NEXT_PUBLIC_ENV === 'testnet'
    ? chainId === 80001
      ? true
      : false
    : chainId === 137
    ? true
    : false;
};

const ethAddEventListener = (event, cb) => {
  if (typeof window === 'undefined') {
    return;
  }
  window?.ethereum?.on(event, cb);
  return () => window?.ethereum?.removeListener(event, cb);
};

const switchToTestNetwork = () => {
  return window?.ethereum?.request({
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

const switchToMaticMainnet = () => {
  return window?.ethereum?.request({
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

const getBasketData = async (bid) =>
  await (
    await getRequest(`/basket/${bid}`)
  ).data;

const getGraphDataWithGrowthRates = async (basketData, days) =>
  (
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/graph/prices`, {
      basketData,
      days,
    })
  ).data;

const getCoinPrices = async (coins) =>
  await (
    await getRequest(`/price?coins=${JSON.stringify(coins)}`)
  ).data;

const getInvestmentsData = async (id, userAddress) =>
  await (
    await getRequest(
      `/investments/basket?userAddress=${userAddress}&basketId=${id}`
    )
  ).data;

const getCreatedBaskets = async (userAddress) =>
  await (
    await getRequest(`/baskets/${userAddress}`)
  ).data;

const getInvestedBaskets = async (userAddress) =>
  await (
    await getRequest(`/invested-baskets/${userAddress}`)
  ).data;

const getPublishedBaskets = async () =>
  (await getRequest(`/published/baskets`)).data;

const getPublishedBasketsByUser = async (userAddress) =>
  await (
    await getRequest(`/published/baskets/${userAddress}`)
  ).data;

const publishBasketRequest = async (userAddress, basketId) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/publish/request/new`,
    {
      userAddress,
      basketId,
    }
  );

const publishBasket = async (basketId) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/publish/basket/new`,
    { basketId }
  );

const getPublishmentRequests = async (bid) =>
  await (
    await getRequest(`/publish/requests`)
  ).data;

const createTableData = (columns, data) => {
  return {
    headings: Object.keys(columns),
    rows: data?.map((item, i) =>
      Object.keys(columns).map((col) => columns[col](item, i))
    ),
  };
};

const getCoinPricesAndTimeStamps = (graphData, coin) => {
  let coinsObj = {
    [coin.name]: graphData?.data.map((item) => ({ ...item })),
  };
  const singleCoinClosePrices = coinsObj[coin.name]?.map(
    (item) => (item['4'] * coin.weight) / 100
  );
  let timeStamp = coinsObj[coin.name]?.map((item) => item['0']);
  return { singleCoinClosePrices, timeStamp };
};

const formatPricesWithTimeStamps = (coinPrices, timeStamps) => {
  let sumOfPrices = (r, a) =>
    r.map((b, i) => {
      let num = a[i] + b;
      return Number(num.toFixed(5));
    });
  let totalBasketPrices = coinPrices.reduce(sumOfPrices);
  let formattedBasketPricesWithTimeStamp = [];
  const formatPricesWithTime = (coinPrices, timeStamps) => {
    coinPrices.map((coinPrice, i) => {
      let obj = {
        price: coinPrice,
        timeStamp: timeStamps[i],
      };
      formattedBasketPricesWithTimeStamp.push(obj);
    });
  };
  formatPricesWithTime(totalBasketPrices, timeStamps);
  formattedBasketPricesWithTimeStamp.pop();
  const currPoint =
    formattedBasketPricesWithTimeStamp[
      formattedBasketPricesWithTimeStamp.length - 1
    ].price;
  const pastPoint = formattedBasketPricesWithTimeStamp[0].price;
  const totalGrowthRateOfbasket = ((currPoint - pastPoint) / pastPoint) * 100;
  return { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket };
};

const getGraphDataPts = async (coinData, days) => {
  const coinPricesPromises = coinData.map(({ id }) => {
    return axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`
    );
  });

  const graphDataArray = await Promise.all(coinPricesPromises);

  const coinPrices = [],
    timeStamps = [];

  graphDataArray.forEach((graphData, i) => {
    const { singleCoinClosePrices, timeStamp } = getCoinPricesAndTimeStamps(
      graphData,
      coinData[i]
    );
    coinPrices.push(singleCoinClosePrices);
    timeStamps.push(timeStamp);
  });

  const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
    formatPricesWithTimeStamps(coinPrices, timeStamps);
  return {
    graphData: formattedBasketPricesWithTimeStamp,
    growthRateOfbasket: totalGrowthRateOfbasket,
  };
};

const getUserAddressByPublicUrl = async (publicUrl) =>
  await (
    await getRequest(`/user?publicUrl=${publicUrl}`)
  ).data.userAddress;

export {
  ethAddEventListener,
  getBalance,
  getChainId,
  getNetwork,
  getProvider,
  isValidNetwork,
  switchToTestNetwork,
  getBasketData,
  getGraphDataWithGrowthRates,
  getCoinPrices,
  getInvestmentsData,
  getCreatedBaskets,
  getInvestedBaskets,
  switchToMaticMainnet,
  getPublishedBaskets,
  getPublishedBasketsByUser,
  publishBasketRequest,
  publishBasket,
  getPublishmentRequests,
  createTableData,
  getGraphDataPts,
  getCoinPricesAndTimeStamps,
  formatPricesWithTimeStamps,
  getUserAddressByPublicUrl,
};
