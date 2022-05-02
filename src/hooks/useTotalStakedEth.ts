import { useEffect, useState } from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useTotalStakedEth = () => {
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await empFinance.getTotalStakedEth(); 
      setBalance(res);
    }

    if (empFinance) {
      fetchBalance();
    }
  }, [empFinance, fastRefresh]);

  return balance;
};

export default useTotalStakedEth;
