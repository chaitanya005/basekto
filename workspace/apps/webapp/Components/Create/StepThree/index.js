import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import { BasketsABI } from '@basketo/contracts';
import { getProvider, isValidNetwork } from '@basketo/web-utils';
import { getBasketDetails } from '../../../features/basketDetails';
import { getTokens } from '../../../features/selectTokens';
import Explore from '../../Common/Explore';
import SwitchNetworkPopup from '../../Common/Popups/SwitchNetworkPopup';
import RequestingPopup from '../../Common/Popups/RequestingPopup';

//the contract address is of polygon mumbai testnet on alchemy
const contractAddress = '0xB5286eA8157e5c1b40B440E3be0F5B251F790931';

//this contract address is from local terminal
// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
let contract;
let account;

const createNewBasket = async (basket) =>
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/basket/new`, basket);

const StepThree = ({ graphData, setDays, setActiveStep, handleGraphdata }) => {
  const router = useRouter();
  const { selectedTokens } = useSelector(getTokens);
  const { basketDetails } = useSelector(getBasketDetails);

  const [userAddress, setUserAddress] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [networkInvalid, setNetworkInvalid] = useState(false);
  const [isCreatingBasket, setIsCreatingBasket] = useState(false);
  // console.log(basketDetails, selectedTokens);
  // const {mutate:createBasket} = useMutation()

  const isWalletConnected = () =>
    !!localStorage.getItem('address');

  const createBasket = async () => {

    // check if wallet settings are valid
    if (!isWalletConnected()) {
      setSnackbarOpen(true);
      setErrMsg('Please connect your wallet and try again!');
      return;
    }
    if (!(await isValidNetwork())) {
      setNetworkInvalid(true);
      return;
    }

    // wallet setup
    [account] =
      (await window?.ethereum?.request({
        method: 'eth_requestAccounts',
      })) || [];
    const signer = getProvider().getSigner();
    setUserAddress(await signer.getAddress());
    try {
      contract = new ethers.Contract(contractAddress, BasketsABI.abi, signer);
      contract?.on('BasketCreated', (tokenId, uri) =>
        console.log('Event emitted this:', parseInt(tokenId), uri)
      );
    } catch (err) {
      console.log('err', err);
      setSnackbarOpen(true);
      setErrMsg('Something went wrong! Please Try again');
    }

    // create basket
    const basket = {
      ...basketDetails,
      coins: selectedTokens,
      accountId: localStorage.getItem('address'),
    };
    try {
      const tokenId = await contract.createBasket(account, 'teststring');
      const newBasket = await createNewBasket(basket);
      newBasket ? router.push('/explore') : console.log('Not creating');
    } catch (err) {
      console.log('error', err);
      setSnackbarOpen(true);
      setErrMsg('Something went wrong! Please Try again');
    }
  };

  const handleCreate = () => {

    setIsCreatingBasket(true);
    createBasket().finally(() =>
      setIsCreatingBasket(false)
    );
  };

  useEffect(() => {
    graphData === null && handleGraphdata();
  }, []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
          setErrMsg('');
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
            setErrMsg('');
          }}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errMsg}
        </Alert>
      </Snackbar>

      <RequestingPopup
        isOpen={ isCreatingBasket }
      />

      <SwitchNetworkPopup
        isOpen={ networkInvalid }
        onClose={ () => setNetworkInvalid(false) }
        onComplete={ async () => {
          if (await isValidNetwork()) {
            setNetworkInvalid(false);
            handleCreate();
          }
        }}
      />

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
          >
            Create
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default StepThree;
