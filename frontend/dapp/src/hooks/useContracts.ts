import { Staking } from './../../../../contract/typechain-types/contracts/Staking';
import { Token } from './../../../../contract/typechain-types/contracts/Token';
import { useEthers } from "@usedapp/core"
import { useMemo } from "react";
import { TOKEN_ADDRESS } from "../constants";
import { Staking__factory, Token__factory } from "../constants/typechain";

export const useContract = () =>{
    const {library} = useEthers();

    if(!library) return;

    const token_contract:Token = useMemo(()=>{
        return Token__factory.connect(TOKEN_ADDRESS, library?.getSigner());
    },[library])

    const staking_contract:Staking = useMemo(()=>{
        return Staking__factory.connect(TOKEN_ADDRESS, library?.getSigner());
    },[library])


    return {token_contract, staking_contract}



}