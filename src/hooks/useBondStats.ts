import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {TokenStat} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useBondStats = (version: number) => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await empFinance.getBondStat(version));
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, empFinance, slowRefresh, version]);

  return stat;
};

export default useBondStats;
