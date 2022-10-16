import React, { useState } from "react";
import { useMint } from "../hooks/useMint";
import Button from "./Button";
import Input from "./Input";

const Mint = () => {
  const [value, setValue] = useState<string>("");
  const mintTokens = useMint();
  return (
    <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:flex lg:items-center lg:py-4 lg:px-8">
      <Button onClick={() => mintTokens(value)}>Mint</Button>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Enter amount for mint"
      />
    </div>
  );
};

export default Mint;
