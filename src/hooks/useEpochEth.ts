import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useEpochEth = () => {
  const { slowRefresh } = useRefresh();
  const [epoch, setEpoch] = useState({ unlocked: false, epoch: BigNumber.from(0) });
  const empFinance = useEmpFinance();
  
  useEffect(() => {
    const fetch = async () => {
      const tuple = await empFinance.getEthEpoch();
      setEpoch(tuple);
    }
    if (empFinance) fetch();
  }, [empFinance, slowRefresh]);
  
  return epoch;
};

export default useEpochEth;
