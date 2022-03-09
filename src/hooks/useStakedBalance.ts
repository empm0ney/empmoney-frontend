import { useCallback, useEffect, useState, useMemo } from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import {ContractName} from '../emp-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number, sectionInUI: Number, account: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  const fetchBalance = useCallback(async () => {
    const balance = await empFinance.stakedBalanceOnBank(poolName, poolId, sectionInUI, account);
    setBalance(balance);
  }, [poolName, poolId, sectionInUI, account, empFinance]);

  useEffect(() => {
    if (account) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [account, poolName, empFinance, sectionInUI, fetchBalance]);

  return balance;
};

export default useStakedBalance;
