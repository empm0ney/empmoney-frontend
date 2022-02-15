import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';

const useBondsPurchasable = (version: number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await empFinance.getBondsPurchasable(version)); // 
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, empFinance, version]);

  return balance;
};

export default useBondsPurchasable;
