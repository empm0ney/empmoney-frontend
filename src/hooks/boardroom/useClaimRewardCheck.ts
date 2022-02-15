import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import useEmpFinance from '../useEmpFinance';

const useClaimRewardCheck = (version: number) => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const empFinance = useEmpFinance();
  const isUnlocked = empFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await empFinance.canUserClaimRewardFromBoardroom(version));
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, empFinance, version]);

  return canClaimReward;
};

export default useClaimRewardCheck;
