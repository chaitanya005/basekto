import { Button, Grid } from '@mui/material';
import { getTokens } from '../../../features/selectTokens';
import { useSelector } from 'react-redux';
import Explore from '../../Common/Explore';
import { getBasketDetails } from '../../../features/basketDetails';
import { useEffect } from 'react';
import { BasketsABI } from '@basketo/contracts';
import { ethers } from 'ethers';

//the contract address is of polygon mumbai testnet on alchemy
const contractAddress = '0xB5286eA8157e5c1b40B440E3be0F5B251F790931';

//this contract address is from local terminal
// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
let contract;
let account;

const StepThree = ({ graphData, setDays, setActiveStep, handleGraphdata }) => {
  const { selectedTokens } = useSelector(getTokens);
  const { basketDetails } = useSelector(getBasketDetails);

  useEffect(async () => {
    graphData === null && handleGraphdata();
    const walletSetup = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, BasketsABI.abi, signer);
      contract?.on('BasketCreated', (tokenId, uri) =>
        console.log('Event emitted this:', parseInt(tokenId), uri)
      );
    };
    walletSetup();
  }, []);

  const handleCreate = async () => {
    const tokenId = await contract.createBasket(account, 'teststring');
    console.log(tokenId);
  };

  return (
    <>
      <Explore
        selectedTokens={selectedTokens}
        basketDetails={basketDetails}
        graphData={graphData}
        setDays={setDays}
      />
      <Button
        color="primary"
        variant="contained"
        sx={{ mr: '10px' }}
        onClick={handleCreate}
      >
        Create
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setActiveStep(1)}
      >
        Back{' '}
      </Button>
    </>
  );
};

export default StepThree;
