import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { deleteAllTokens, getTokens } from '../../../features/selectTokens';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import { BasketsABI } from '@basketo/contracts';
import { getProvider, isValidNetwork } from '@basketo/web-utils';
import {
  getBasketDetails,
  setBasketDetails,
} from '../../../features/basketDetails';
import Explore from '../../Common/Explore';
import SwitchNetworkPopup from '../../Common/Popups/SwitchNetworkPopup';
import RequestingPopup from '../../Common/Popups/RequestingPopup';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

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
  const dispatch = useDispatch();
  const { selectedTokens } = useSelector(getTokens);
  const { basketDetails } = useSelector(getBasketDetails);

  const [userAddress, setUserAddress] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [networkInvalid, setNetworkInvalid] = useState(false);
  const [isCreatingBasket, setIsCreatingBasket] = useState(false);
  const [basketCreated, setIsBasketCreated] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const isWalletConnected = () => !!localStorage.getItem('address');

  // const createBasket = async () => {
  //   // check if wallet settings are valid
  //   if (!isWalletConnected()) {
  //     setAlert({
  //       open: true,
  //       message: 'Please connect your wallet and try again!',
  //       severity: 'error',
  //     });
  //     return;
  //   }
  //   // if (!(await isValidNetwork())) {
  //   //   setNetworkInvalid(true);
  //   //   return;
  //   // }

  //   // // wallet setup
  //   // [account] =
  //   //   (await window?.ethereum?.request({
  //   //     method: 'eth_requestAccounts',
  //   //   })) || [];
  //   // const signer = getProvider().getSigner();
  //   // setUserAddress(await signer.getAddress());
  //   // try {
  //   //   contract = new ethers.Contract(contractAddress, BasketsABI.abi, signer);
  //   //   contract?.on('BasketCreated', (tokenId, uri) =>
  //   //     console.log('Event emitted this:', parseInt(tokenId), uri)
  //   //   );
  //   // } catch (err) {
  //   //   console.log('err', err);
  //   //   setAlert({
  //   //     open: true,
  //   //     message: 'Something went wrong! Please Try again',
  //   //     severity: 'error',
  //   //   });
  //   // }

  //   // create basket
  //   const basket = {
  //     ...basketDetails,
  //     coins: selectedTokens,
  //     accountId: localStorage.getItem('address'),
  //   };
  //   try {
  //     // const tokenId = await contract.createBasket(account, 'teststring');
  //     const newBasket = await createNewBasket(basket);
  //     if (newBasket) {
  //       dispatch(
  //         setBasketDetails({
  //           basketData: [],
  //         })
  //       );
  //       dispatch(
  //         deleteAllTokens({
  //           emptyData: [],
  //         })
  //       );
  //       setIsBasketCreated(true);
  //     }
  //   } catch (err) {
  //     console.log('error', err);
  //     setAlert({
  //       open: true,
  //       message: 'Something went wrong! Please Try again',
  //       severity: 'error',
  //     });
  //   }
  // };

  const createBasket = async () => {
    // check if wallet settings are valid
    if (!isWalletConnected()) {
      setAlert({
        open: true,
        message: 'Please connect your wallet and try again!',
        severity: 'error',
      });
      return;
    }

    const basket = {
      ...basketDetails,
      coins: selectedTokens,
      accountId: localStorage.getItem('address'),
    };

    try {
      const newBasket = await createNewBasket(basket);
      if (newBasket) {
        dispatch(
          setBasketDetails({
            basketData: [],
          })
        );
        dispatch(
          deleteAllTokens({
            emptyData: [],
          })
        );
        setIsBasketCreated(true);
      }
    } catch (err) {
      console.log('error', err);
      setAlert({
        open: true,
        message: 'Something went wrong! Please Try again',
        severity: 'error',
      });
    }
  };

  const handleCreate = () => {
    setIsCreatingBasket(true);
    createBasket().finally(() => setIsCreatingBasket(false));
  };

  useEffect(() => {
    graphData === null && handleGraphdata();
  }, []);

  return (
    <Grid>
      <Snackbar
        open={alert.open}
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
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <RequestingPopup isOpen={isCreatingBasket} />

      <SwitchNetworkPopup
        isOpen={networkInvalid}
        onClose={() => setNetworkInvalid(false)}
        onComplete={async () => {
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
        graphDataWithGrowthRates={graphData}
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
      {typeof window !== undefined && basketCreated && (
        <Confetti
          width={window?.innerWidth}
          height={window?.innerHeight}
          recycle={false}
          numberOfPieces={2000}
        />
      )}
    </Grid>
  );
};

export default StepThree;
