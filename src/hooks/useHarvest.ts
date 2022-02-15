import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../emp-finance';

const useHarvest = (bank: Bank) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      empFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, empFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
