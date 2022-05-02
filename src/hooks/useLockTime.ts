import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useLockTime = (epoch: number) => {
  const [time, setTime] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  
  useEffect(() => {
    const fetch = async () => {
      const time = await empFinance.getLockTime(epoch);
      setTime(time);
    }
    if (empFinance && epoch) fetch();
  }, [empFinance, epoch]);
  
  return time;
};

export default useLockTime;

