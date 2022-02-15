import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (version: number, description?: string) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem ESHARE from Boardroom';
    handleTransactionReceipt(empFinance.exitFromBoardroom(version), alertDesc);
  }, [empFinance, description, handleTransactionReceipt, version]);
  return {onRedeem: handleRedeem};
};

export default useRedeemOnBoardroom;
