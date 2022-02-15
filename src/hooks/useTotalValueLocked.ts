import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const empFinance = useEmpFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await empFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, empFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
