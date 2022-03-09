import { BigNumber } from 'ethers';
import { BigNumber as BigNumberJS } from 'bignumber.js';
import { useCallback } from 'react';
import useEmpFinance from './useEmpFinance';
import { Bank } from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { useDepositLottery } from './useDetonator';

const useZap = (bank: Bank) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { onDeposit } = useDepositLottery()

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        empFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, empFinance, handleTransactionReceipt],
  );

  async function handleZapIn(zappingToken: string, tokenName: string, amount: string, startBalance: BigNumber) {
    const zapTx = await empFinance.zapIn(zappingToken, tokenName, amount);
    await zapTx.wait();
    const afterBalance = await empFinance.externalTokens['EMP-ETH-LP'].balanceOf(empFinance.myAccount);
    return await onDeposit(new BigNumberJS(afterBalance.sub(startBalance).toString()).div(new BigNumberJS(10).pow(18)).toFixed());
  }

  return { onZap: handleZap, onZapIn: handleZapIn };
};

export default useZap;
