import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = (version: number) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(empFinance.stakeShareToBoardroom(version, amount), `Stake ${amount} ESHARE to the boardroom`);
    },
    [empFinance, handleTransactionReceipt, version],
  );
  return {onStake: handleStake};
};

export default useStakeToBoardroom;
