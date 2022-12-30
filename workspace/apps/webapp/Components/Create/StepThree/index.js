import { Alert, Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import { getTokens } from '../../../features/selectTokens';
import { useSelector } from 'react-redux';
import Explore from '../../Common/Explore';
import { getBasketDetails } from '../../../features/basketDetails';
import { useEffect, useState } from 'react';
import { BasketsABI } from '@basketo/contracts';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getNetwork, getProvider, switchNetwork } from '@basketo/web-utils';
import DialogBox from '../../Common/DialogBox';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  // console.log(basketDetails, selectedTokens);
  // const {mutate:createBasket} = useMutation()

  const isWalletConnected = () => !!localStorage.getItem('address');

  const handleCreate = async () => {
    // check if wallet settings are valid
    if (!isWalletConnected()) {
      setSnackbarOpen(true);
      setErrMsg('Please connect your wallet and try again!');
      return;
    }
    if (getNetwork().name !== 'maticmum') {
      setDialogOpen(true);
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

  useEffect(() => {
    graphData === null && handleGraphdata();
  }, []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false), setErrMsg('');
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false), setErrMsg('');
          }}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errMsg}
        </Alert>
      </Snackbar>

      <DialogBox
        title="Invalid Network"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dividers
      >
        <Typography marginBottom={2}>
          In order to create a basket, {"you'll"} need to switch to the Polygon{' '}
          {'(Mumbai)'} network
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            switchNetwork();
            setDialogOpen(false);
          }}
          fullWidth
        >
          Switch to Polygon {'(Mumbai)'}
        </Button>
      </DialogBox>

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
