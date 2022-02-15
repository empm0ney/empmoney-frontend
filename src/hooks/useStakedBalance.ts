import {useCallback, useEffect, useState} from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import {ContractName} from '../emp-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const isUnlocked = empFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await empFinance.stakedBalanceOnBank(poolName, poolId, empFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, empFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, empFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
