import Hero from '../Components/Home/Hero';
import TopBaskets from '../Components/Home/TopBaskets';
import TrendingManagers from '../Components/Home/TrendingManagers.js';
import Partners from '../Components/Home/Partners';
import CreateBaskets from '../Components/Home/CreateBaskets';
import Steps from '../Components/Home/Steps';
import Subscription from '../Components/Home/Subscription';
import FAQ from '../Components/Home/FAQ';
import Footer from '../Components/Footer';
import { Network, Alchemy } from 'alchemy-sdk';
import axios from 'axios';
import Head from 'next/head';

const index = () => {
  const settings = {
    apiKey: 'AKp2sWVn_jv0X5kbQqzj8xcMO0nay6ls',
    network: Network.MATIC_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const main = async () => {
    // Wallet address
    const address = '0x9E742d2C40bcA919d51a722f075c480D1D4A8f89';

    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);
    const nonZeroBalances = await balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== '0';
    });

    const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/AKp2sWVn_jv0X5kbQqzj8xcMO0nay6ls`;

    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // options for making a request to get the token metadata
      const options = {
        method: 'POST',
        url: baseURL,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        data: {
          id: 1,
          jsonrpc: '2.0',
          method: 'alchemy_getTokenMetadata',
          params: [token.contractAddress],
        },
      };

      // getting the token metadata
      const metadata = await axios.request(options);

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata['data']['result'].decimals);
      // balance = balance.toFixed(2);

      // Print name, balance, and symbol of token
      console.log(
        ` ${metadata['data']['result'].name}: ${balance} ${metadata['data']['result'].symbol}`
      );
    }
  };

  const runMain = async () => {
    try {
      await main();
      // process.exit(0);
    } catch (error) {
      console.log(error);
      // process.exit(1);
    }
  };

  // runMain();

  return (
    <>
      <Head>
        <title>Basketo | Home</title>
      </Head>
      <Hero />
      {/* <TopBaskets /> */}
      {/* <TrendingManagers /> */}
      <Partners />
      <Steps />
      <CreateBaskets />
      <Subscription />
      <FAQ />
      <Footer />
    </>
  );
};

export default index;
