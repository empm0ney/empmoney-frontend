import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = (version: number) => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = empFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await empFinance.getTotalStakedInBoardroom(version));
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, empFinance, version]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;
