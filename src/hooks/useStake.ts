import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import {Bank} from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const useStake = (bank: Bank) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = bank.sectionInUI !== 3 
        ? parseUnits(amount, bank.depositToken.decimal)
        : BigNumber.from(amount);
      handleTransactionReceipt(
        empFinance.stake(bank.contract, bank.poolId, bank.sectionInUI, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, empFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;
