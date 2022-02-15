import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useBnbStats = () => {
  const [stat, setStat] = useState<string>();
  const {slowRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await empFinance.getWBNBPriceFromPancakeswap());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, empFinance, slowRefresh]);

  return stat;
};

export default useBnbStats;
