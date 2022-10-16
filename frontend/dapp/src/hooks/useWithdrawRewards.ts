import { useCallback } from "react";
import { useContracts } from "./useContracts"
import { useToast } from "./useToast";


export const useWithdrawRewards = () =>{
    const {staking_contract} = useContracts();

    const {triggerError, handlePromise} = useToast();

    return useCallback(async ()=>{

        if(!staking_contract) return;

        try {
           const txPromise = await staking_contract.withdrawRewards()

           const txReceipt = txPromise.wait();

           await handlePromise(txReceipt, "Rewards Withdraw!");
            
        } catch (error:any) {
            const errorMessage = error.message || error.error.message;
            triggerError(errorMessage);
        }
    },[staking_contract])
}