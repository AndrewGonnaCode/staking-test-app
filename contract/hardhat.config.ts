
import * as dotenv from 'dotenv'

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import "@nomicfoundation/hardhat-chai-matchers";
import '@nomiclabs/hardhat-ethers'
import "solidity-coverage";



dotenv.config()


const config: HardhatUserConfig = {
  solidity: {
		version: '0.8.9',
		settings: {
			optimizer: {
				enabled: true,
				runs: 100,
			},
		},
	},
	networks: {
		hardhat: {},
		goerli:{
			url:process.env.NODE_URL,
			accounts:[process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY:'']
		}
	},
	etherscan: {
		apiKey: {
			mainnet: process.env.ETHERSCAN_API_KEY as string,
			goerli: process.env.ETHERSCAN_API_KEY as string,
		},
	},
};

export default config;


export function getDeploymentAccount(): string[] {
	return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
}
