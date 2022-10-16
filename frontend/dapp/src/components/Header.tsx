
import ConnectWallet from './ConnectWallet';

const Header = () => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      <span className="block">Staking App</span>
    </h2>
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
       <ConnectWallet/>
    </div>
  </div>
  )
}

export default Header