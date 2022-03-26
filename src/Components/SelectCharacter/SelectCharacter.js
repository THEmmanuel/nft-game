import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';

const SelectCharacter = ({ setCharacterNFT }) => {
	const [characters, setCharacters] = useState([]);
	const [gameContract, setGameContract] = useState(null);

	useEffect(() => {
		const { ethereum } = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const gameContract = new ethers.Contract(
				CONTRACT_ADDRESS,
				myEpicGame.abi,
				signer
			);
			// Set gameContract in state.
			setGameContract(gameContract);
		} else {
			console.log('Ethereum object not found')
		}
	}, [])


	return (
		<div className='select-character-container'>
			<h2>Select and mint your Hero.</h2>
		</div>
	);
};

export default SelectCharacter;