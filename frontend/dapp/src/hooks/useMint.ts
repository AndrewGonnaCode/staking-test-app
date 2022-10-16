import { useCallback } from "react";
import { numberInWeiToEth } from "../helpers";
import { useContracts } from "./useContracts"
import { useToast } from "./useToast";


export const useMint = () =>{
    const {token_contract} = useContracts();
    const {triggerError, handlePromise} = useToast();

    return useCallback(async (amount:string)=>{

        if(!token_contract) return;

        try {

           const formattedAmount = numberInWeiToEth(amount);
           
           const txPromise = await token_contract.mint(formattedAmount);

           const txReceipt = txPromise.wait();

           await handlePromise(txReceipt, "Mint!");
            
        } catch (error:any) {
            const errorMessage = error.message || error.error.message;
            triggerError(errorMessage);
        }
    },[token_contract])
}