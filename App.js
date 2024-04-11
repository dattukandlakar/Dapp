import abi from '../src/contract/chai.json';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Buy from './component/Buy'
import Memos from './component/Memos';
const { ethers } = require('ethers');

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xD248E5d9964830eD9f04DC9524Ad96960c149751";
      const contractAbi = abi.abi;

      if (window.ethereum) {

        window.ethereum.on("accountChanged",()=>{
          window.location.reload();
        })

        window.ethereum.on('chainChaged',()=>{
          window.location.reload()
        })
        
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setState({
            provider: provider,
            signer: signer,
            contract: contract
          });
         
          toast("Successfully connected to MetaMask");
        } catch (error) {
          console.error(error);
        }
      } else {
        setErrorMessage('Install MetaMask');
      }
    };

    connectWallet();
  }, []);

  function print(){
    console.log(state)
  }

  return (
    <div className='image' >
      {/* You can add UI elements here to prompt the user to open MetaMask */}
      
      
      <ToastContainer />
      <Buy state={state} />
      <Memos state={state} />

    </div>
  );
}

export default App;
