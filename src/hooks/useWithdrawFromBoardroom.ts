import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = (version: number) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        empFinance.withdrawShareFromBoardroom(version, amount),
        `Withdraw ${amount} ESHARE from the boardroom`,
      );
    },
    [empFinance, handleTransactionReceipt, version],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;
