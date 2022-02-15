import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import {ContractName} from '../emp-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const isUnlocked = empFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await empFinance.earnedFromBank(poolName, earnTokenName, poolId, empFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, empFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, empFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
