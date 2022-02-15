import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = (version: number) => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setCurrentEpoch(await empFinance.getCurrentEpoch(version));
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, empFinance, slowRefresh, version]);

  return currentEpoch;
};

export default useCurrentEpoch;
