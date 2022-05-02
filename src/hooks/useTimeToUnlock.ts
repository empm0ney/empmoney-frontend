import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useTimeToUnlock = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  useEffect(() => {
    const fetch = async () => {
      const time = await empFinance.getTimeToUnlock();
      setTime(time);
    }
    if (empFinance) fetch();
  }, [empFinance, slowRefresh]);
  
  return time;
};

export default useTimeToUnlock;
