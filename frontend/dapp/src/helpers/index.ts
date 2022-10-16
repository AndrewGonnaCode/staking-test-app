import { ethers } from 'ethers';
export const numberInWeiToEth = (amount:string) =>{
   return ethers.utils.parseEther(amount);
}