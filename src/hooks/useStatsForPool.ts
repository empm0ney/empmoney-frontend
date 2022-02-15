import {useCallback, useState, useEffect} from 'react';
import useEmpFinance from './useEmpFinance';
import {Bank} from '../emp-finance';
import {PoolStats} from '../emp-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const empFinance = useEmpFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await empFinance.getPoolAPRs(bank));
  }, [empFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, empFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
