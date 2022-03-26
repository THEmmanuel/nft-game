const CONTRACT_ADDRESS = '0x38e62DAfCB1ff52856AF2382E8f8B5cCE65D7316';

const transformCharacterData = (characterData) => {
	return {
		name: characterData.name,
		imageURI: characterData.imageURI,
		hp: characterData.hp.toNumber(),
		maxHp: characterData.maxHp.toNumber(),
		attackDamage: characterData.attackDamage.toNumber(),
	};
};

export {
	CONTRACT_ADDRESS,
	transformCharacterData
};