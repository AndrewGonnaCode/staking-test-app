import { STAKING_ADDRESS } from "./../constants/index";
import { Staking } from "./../../../../contract/typechain-types/contracts/Staking";
import { Token } from "./../../../../contract/typechain-types/contracts/Token";
import { useEthers } from "@usedapp/core";
import { useMemo } from "react";
import { TOKEN_ADDRESS } from "../constants";
import { Staking__factory, Token__factory } from "../constants/typechain";

export const useContracts = () => {
  const { library } = useEthers();

  const token_contract = useMemo(() => {
    if (library)
      return Token__factory.connect(TOKEN_ADDRESS, library?.getSigner());
  }, [library]);

  const staking_contract = useMemo(() => {
    if (library)
      return Staking__factory.connect(STAKING_ADDRESS, library?.getSigner());
  }, [library]);

  return { token_contract, staking_contract };
};
