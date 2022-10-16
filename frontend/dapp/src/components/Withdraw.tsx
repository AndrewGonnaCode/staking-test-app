import React from 'react'
import { useWithdrawTokens } from '../hooks/useWithdrawTokens';
import Button from './Button';

const Withdraw = () => {
  const withdrawTokens = useWithdrawTokens();
  return (
    <div className='mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:flex lg:items-center lg:py-4 lg:px-8'>
    <Button onClick={()=>withdrawTokens()}>
        Withdraw Tokens
     </Button>
     </div>
  )
}

export default Withdraw