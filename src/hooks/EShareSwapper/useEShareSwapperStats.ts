import {useEffect, useState} from 'react';
import useEmpFinance from '../useEmpFinance';
import {EShareSwapperStat} from '../../emp-finance/types';
import useRefresh from '../useRefresh';

const useEShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<EShareSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchEShareSwapperStat() {
      try {
        if (empFinance.myAccount) {
          setStat(await empFinance.getEShareSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchEShareSwapperStat();
  }, [setStat, empFinance, fastRefresh, account]);

  return stat;
};

export default useEShareSwapperStats;
