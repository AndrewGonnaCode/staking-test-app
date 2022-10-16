import { useEthers } from '@usedapp/core';
import { numberInWeiToEth } from './../helpers/index';
import { useCallback } from "react";
import { useContracts } from "./useContracts"
import { useToast } from "./useToast";
import { STAKING_ADDRESS } from '../constants';


export const useStake = () =>{
    const {staking_contract, token_contract} = useContracts();

    const {triggerError, handlePromise} = useToast();

    const {account} = useEthers();

    return useCallback(async (amount:string)=>{

        if(!staking_contract || !token_contract) return;

        try {

            if(!account) return;

            const formattedAmount = numberInWeiToEth(amount);

            const allowance = await token_contract.allowance(account, STAKING_ADDRESS);

            if(Number(formattedAmount) < Number(allowance)){
                const approvePromise = await token_contract.approve(STAKING_ADDRESS, formattedAmount);

                const approveReceipt = approvePromise.wait();
     
                await handlePromise(approveReceipt, "Tokens Withdraw!");
            }

            const stakePromise = await staking_contract.stake(formattedAmount);

            const stakeReceipt = stakePromise.wait();
     
            await handlePromise(stakeReceipt, "Stake!");


            
        } catch (error:any) {
            const errorMessage = error.message || error.error.message;
            triggerError(errorMessage);
        }
    },[staking_contract])
}