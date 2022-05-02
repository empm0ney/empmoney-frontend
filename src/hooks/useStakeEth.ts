import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import {Bank} from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const useStakeEth = () => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      handleTransactionReceipt(
        empFinance.stakeEth(amountBn),
        `Stake ${amount} ETH`,
      );
    },
    [empFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeEth;
