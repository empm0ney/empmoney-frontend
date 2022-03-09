import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useEmpFinance from './useEmpFinance';
import { ContractName } from '../emp-finance';
import config from '../config';

const useNodePrice = (poolName: ContractName, poolId: Number, sectionInUI: Number) => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  const fetchAmount = useCallback(async () => {
    const balance = sectionInUI === 3 ? await empFinance.getNodePrice(poolName, poolId) : BigNumber.from(0);
    setAmount(balance);
  }, [poolName, poolId, sectionInUI, empFinance]);

  useEffect(() => {
    if (sectionInUI === 3) {
      fetchAmount().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchAmount, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [poolName, setAmount, empFinance, fetchAmount]);

  return amount;
};

export default useNodePrice;
