import { useState, createContext, useContext } from 'react';

const AppContext = createContext(null);

export const useAppContextWrapper = () => {
  const [walletAddress, setWalletAddress] = useState('');
  return {
    walletAddress,
    setWalletAddress
  }
}

export const useAppContext = () => {
  const {
    walletAddress,
    setWalletAddress
  } = useContext(AppContext);

  return {
    walletAddress,
    setWalletAddress
  }
}

export const AppContextProvider = ( { children }) => {
  const value = useAppContextWrapper();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}