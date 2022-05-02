import { useEffect, useState } from 'react';

import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useEthMax = () => {
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await empFinance.getMaxStakedEth(); 
      setBalance(res);
    }

    if (empFinance) {
      fetchBalance();
    }
  }, [empFinance, fastRefresh]);

  return balance;
};

export default useEthMax;
