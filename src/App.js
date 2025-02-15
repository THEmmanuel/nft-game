import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

import SelectCharacter from './Components/SelectCharacter/SelectCharacter';
import Arena from './Components/Arena/Arena';

import MyEpicGame from './utils/MyEpicGame.json';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';


// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	// State
	const [currentAccount, setCurrentAccount] = useState(null);
	const [characterNFT, setCharacterNFT] = useState(null);

	// Actions
	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log('Make sure you have MetaMask!');
				return;
			} else {
				console.log('We have the ethereum object', ethereum);

				const accounts = await ethereum.request({ method: 'eth_accounts' });

				if (accounts.length !== 0) {
					const account = accounts[0];
					console.log('Found an authorized account:', account);
					setCurrentAccount(account);
				} else {
					console.log('No authorized account found');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const renderContent = () => {
		if (!currentAccount) {
			return (
				<div className="connect-wallet-container">
					<img
						src="https://media.giphy.com/media/X6aDDzm9Kv1YsvluTU/giphy.gif"
						alt="Monty Python Gif"
					/>

					<button
						className="cta-button connect-wallet-button"
						onClick={connectWalletHandler}
					>
						Connect Wallet To Get Started
					</button>
				</div>
			);
		} else if (currentAccount && !characterNFT) {
			return <SelectCharacter setCharacterNFT={setCharacterNFT} />
		} else if (currentAccount && characterNFT) {
			return <Arena characterNFT={characterNFT}/>
		}
	};

	const connectWalletHandler = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			//  request access to account.
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			// print out public address once we authorize Metamask.

			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const checkNetwork = async () => {
		try {
			if (window.ethereum.networkVersion !== '4') {
				alert('Please connect to Rinkeby!')
			}
		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		checkIfWalletIsConnected();
		checkNetwork();
	}, []);

	useEffect(() => {
		const fetchNFTMetadata = async () => {
			console.log('Checking for Character NFT on address', currentAccount);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const gameContract = new ethers.Contract(
				CONTRACT_ADDRESS,
				MyEpicGame.abi,
				signer
			);

			const txn = await gameContract.checkIfUserHasNFT();
			console.log(txn);
			if (txn.name) {
				console.log('User has character NFT');
				setCharacterNFT(transformCharacterData(txn));
			} else {
				console.log('No character NFT found');
			}
		};

		if (currentAccount) {
			console.log('CurrentAccount: ', currentAccount)
			fetchNFTMetadata();
		}
	}, [currentAccount])


	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header gradient-text">⚔️ Monster Slayer ⚔️</p>
					<p className="sub-text">Team up with heroes to save humanity!</p>
					{renderContent()}
				</div>
				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built with @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;