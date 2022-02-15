import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {TokenStat} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = (version: number) => {
  const [stat, setStat] = useState<TokenStat>();
  const empFinance = useEmpFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await empFinance.getEmpStatInEstimatedTWAP(version));
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, empFinance, slowRefresh, version]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
