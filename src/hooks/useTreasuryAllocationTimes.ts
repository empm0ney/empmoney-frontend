import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {AllocationTime} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = (version: number) => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const empFinance = useEmpFinance();
  useEffect(() => {
    if (empFinance) {
      empFinance.getTreasuryNextAllocationTime(version).then(setTime);
    }
  }, [empFinance, slowRefresh, version]);
  return time;
};

export default useTreasuryAllocationTimes;
