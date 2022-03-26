import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';

const SelectCharacter = ({ setCharacterNFT }) => {
	const [characters, setCharacters] = useState([]);
	const [gameContract, setGameContract] = useState(null);

	return (
		<div className='select-character-container'>
			<h2>Select and mint your Hero.</h2>
		</div>
	);
};

export default SelectCharacter;