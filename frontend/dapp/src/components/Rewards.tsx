import React from 'react'
import { useWithdrawRewards } from '../hooks/useWithdrawRewards'
import Button from './Button'

const Rewards = () => {
  const withdrawRewards = useWithdrawRewards();
  return (
    <div className='mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:flex lg:items-center lg:py-4 lg:px-8'>
    <Button onClick={()=>withdrawRewards()}>
        Withdraw Rewards
     </Button>
     </div>
  )
}

export default Rewards