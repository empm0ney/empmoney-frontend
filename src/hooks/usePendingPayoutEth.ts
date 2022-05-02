import { useWallet } from 'use-wallet';
import { useEffect, useState } from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const usePendingPayoutEth = () => {
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const { account } = useWallet()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await empFinance.getPendingPayoutEth(account); 
      setBalance(res);
    }

    if (empFinance && account) {
      fetchBalance();
    }
  }, [empFinance, account, fastRefresh]);

  return balance;
};

export default usePendingPayoutEth;
