import { useEffect, useState, useMemo } from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import {ContractName} from '../emp-finance';

const useClaimedBalance = (poolName: ContractName, sectionInUI: Number, account: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await empFinance.claimedBalanceNode(poolName, account) 
      setBalance(res)
    }

    if (account && sectionInUI === 3 && empFinance && poolName) {
      fetchBalance();
    }
  }, [account, poolName, setBalance, empFinance, sectionInUI]);

  return balance;
};

export default useClaimedBalance;
