import { Box, Button, Grid, Typography } from '@mui/material';
import { getTokens } from '../../../features/selectTokens';
import { useSelector } from 'react-redux';
import Explore from '../../Common/Explore';
import { getBasketDetails } from '../../../features/basketDetails';
import { useEffect, useState } from 'react';
import { BasketsABI } from '@basketo/contracts';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getNetwork, switchNetwork } from '@basketo/web-utils'

//the contract address is of polygon mumbai testnet on alchemy
const contractAddress = '0xB5286eA8157e5c1b40B440E3be0F5B251F790931';

//this contract address is from local terminal
// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
let contract;
let account;

const createNewBasket = async (basket) =>
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/basket/new`, basket);

const StepThree = ({ graphData, setDays, setActiveStep, handleGraphdata }) => {
  const { selectedTokens } = useSelector(getTokens);
  const { basketDetails } = useSelector(getBasketDetails);
  const [userAddress, setUserAddress] = useState(null);
  const [network, setNetwork] = useState(getNetwork());
  const router = useRouter();
  const isValidNetwork = network.name === 'maticmum';
  // console.log(basketDetails, selectedTokens);
  // const {mutate:createBasket} = useMutation()

  useEffect(() => {

    graphData === null && handleGraphdata();

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    provider.on('network', (newNetwork, oldNetwork) => {
      oldNetwork && setNetwork(newNetwork);
    });
  }, []);

  useEffect(() => {

    const walletSetup = async () => {
      const provider = new ethers.providers.Web3Provider(
        window?.ethereum && window?.ethereum
      );
      [account] = await window?.ethereum?.request({
        method: 'eth_requestAccounts',
      }) || [];
      const signer = provider.getSigner();
      setUserAddress(await signer.getAddress());
      contract = new ethers.Contract(contractAddress, BasketsABI.abi, signer);
      contract?.on('BasketCreated', (tokenId, uri) =>
        console.log('Event emitted this:', parseInt(tokenId), uri)
      );
    };
    walletSetup();
  }, [network]);

  const handleCreate = async () => {
    const basket = {
      ...basketDetails,
      coins: selectedTokens,
      accountId: userAddress,
    };
    const tokenId = await contract.createBasket(account, 'teststring');
    console.log(tokenId);
    const newBasket = await createNewBasket(basket);
    newBasket ? router.push('/explore') : console.log('Not creating');
  };

  return (
    <>
      <Explore
        basket={{
          ...basketDetails,
          accountId: userAddress,
        }}
        coins={selectedTokens}
        graphData={graphData}
        setDays={setDays}
        showDetails={false}
      />


      <Box sx={{ mt: 4 }}>
        { !isValidNetwork && (
          <Typography
            color="error"
            fontSize="small"
            textAlign="center"
          >
            Please {' '}
            <span
              onClick={ switchNetwork }
              style={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              switch
            </span>
            {' '}to the Polygon Mumbai { '(testnet)' } network before creating basket!
          </Typography>
        )}

        <Grid display={'flex'} justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setActiveStep(1)}
          >
            Back{' '}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreate}
            sx={{ padding: '0 20px' }}
            disabled={ !isValidNetwork }
          >
            Create
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default StepThree;
