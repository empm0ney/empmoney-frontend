import {useCallback} from 'react';
import useEmpFinance from '../useEmpFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapEBondToEShare = () => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapEShare = useCallback(
    (bbondAmount: string) => {
      const bbondAmountBn = parseUnits(bbondAmount, 18);
      handleTransactionReceipt(empFinance.swapEBondToEShare(bbondAmountBn), `Swap ${bbondAmount} EBond to EShare`);
    },
    [empFinance, handleTransactionReceipt],
  );
  return {onSwapEShare: handleSwapEShare};
};

export default useSwapEBondToEShare;
