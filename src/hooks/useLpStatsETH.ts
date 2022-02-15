import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {LPStat} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useLpStatsETH = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await empFinance.getLPStatETH(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, empFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStatsETH;
