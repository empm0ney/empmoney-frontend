import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import {Bank} from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const useExitEth = () => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleExit = useCallback(
    (earlyWithFee: boolean) => {
      handleTransactionReceipt(
        empFinance.exitEth(earlyWithFee),
        `Exit staked ETH`,
      );
    },
    [empFinance, handleTransactionReceipt],
  );
  return {onExit: handleExit};
};

export default useExitEth;
