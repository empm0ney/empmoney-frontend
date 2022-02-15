import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {TokenStat} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await empFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, empFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
