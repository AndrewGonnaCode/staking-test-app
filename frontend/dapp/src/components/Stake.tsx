import React, { useState } from "react";
import { useStake } from "../hooks/useStake";
import Button from "./Button";
import Input from "./Input";

const Stake = () => {
  const [value, setValue] = useState<string>("");
  const stakeTokens = useStake();
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:py-16 lg:px-8">
      <Button onClick={() => stakeTokens(value)}>Stake</Button>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Enter amount for stake"
      />
    </div>
  );
};

export default Stake;
