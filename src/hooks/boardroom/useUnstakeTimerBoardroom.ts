import {useEffect, useState} from 'react';
import useEmpFinance from '../useEmpFinance';
import {AllocationTime} from '../../emp-finance/types';

const useUnstakeTimerBoardroom = (version: number) => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const empFinance = useEmpFinance();

  useEffect(() => {
    if (empFinance) {
      empFinance.getUserUnstakeTime(version).then(setTime);
    }
  }, [empFinance, version]);
  return time;
};

export default useUnstakeTimerBoardroom;
