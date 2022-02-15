import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useEarningsOnBoardroom = (version: number) => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const isUnlocked = empFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await empFinance.getEarningsOnBoardroom(version));
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, empFinance, slowRefresh, version]);

  return balance;
};

export default useEarningsOnBoardroom;
