import { useCallback } from "react";
import { useContracts } from "./useContracts"
import { useToast } from "./useToast";


export const useWithdrawTokens = () =>{
    const {staking_contract} = useContracts();

    const {triggerError, handlePromise} = useToast();

    return useCallback(async ()=>{

        if(!staking_contract) return;

        try {
           const txPromise = await staking_contract.withdrawTokens();

           const txReceipt = txPromise.wait();

           await handlePromise(txReceipt, "Tokens Withdraw!");
            
        } catch (error:any) {
            const errorMessage =
            error?.error?.message ||
            error?.message ||
            "Check console logs for error"
            triggerError(errorMessage);
        }
    },[staking_contract])
}