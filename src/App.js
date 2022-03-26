import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import SelectCharacter from './Components/SelectCharacter/SelectCharacter';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	// State
	const [currentAccount, setCurrentAccount] = useState(null);

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

	const connectWalletHandler = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			/*
			 * Fancy method to request access to account.
			 */
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			/*
			 * Boom! This should print out public address once we authorize Metamask.
			 */
			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
					<p className="sub-text">Team up to protect the Metaverse!</p>
					<div className="connect-wallet-container">
						<img
							src="https://media.giphy.com/media/X6aDDzm9Kv1YsvluTU/giphy.gif"
							alt="Monty Python Gif"
						/>
						{/*
             * Button that we will use to trigger wallet connect
             * Don't forget to add the onClick event to call your method!
             */}
						<button
							className="cta-button connect-wallet-button"
							onClick={connectWalletHandler}
						>
							Connect Wallet To Get Started
						</button>
					</div>
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