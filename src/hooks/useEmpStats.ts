import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {TokenStat} from '../emp-finance/types';
import useRefresh from './useRefresh';

const useEmpStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchEmpPrice() {
      try {
        setStat(await empFinance.getEmpStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchEmpPrice();
  }, [setStat, empFinance, fastRefresh]);

  return stat;
};

export default useEmpStats;
