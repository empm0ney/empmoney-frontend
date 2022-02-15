import {useCallback, useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = (version: number) => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const empFinance = useEmpFinance();
  const stakedBalance = useStakedBalanceOnBoardroom(version);

  const updateState = useCallback(async () => {
    setBoardroomVersion(await empFinance.fetchBoardroomVersionOfUser());
  }, [empFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (empFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [empFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
