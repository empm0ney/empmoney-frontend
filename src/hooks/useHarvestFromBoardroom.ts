import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = (version: number) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(empFinance.harvestCashFromBoardroom(version), 'Claim EMP from Boardroom');
  }, [empFinance, handleTransactionReceipt, version]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;
