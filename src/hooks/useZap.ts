import { BigNumber } from 'ethers';
import { BigNumber as BigNumberJS } from 'bignumber.js';
import { useCallback } from 'react';
import useEmpFinance from './useEmpFinance';
import { Bank } from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string, slippageBp: string) => {
      handleTransactionReceipt(
        empFinance.zapIn(zappingToken, tokenName, amount, slippageBp),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, empFinance, handleTransactionReceipt],
  );

  async function handleZapIn(
    zappingToken: string,
    tokenName: string,
    amount: string,
    slippageBp: string,
    startBalance: BigNumber,
    onDeposit: ((amount: string) => void) | ((amount: string) => Promise<any>)
  ) {
    const zapTx = await empFinance.zapIn(zappingToken, tokenName, amount, slippageBp);
    await zapTx.wait();
    const afterBalance = await empFinance.externalTokens[tokenName].balanceOf(empFinance.myAccount);
    return await onDeposit(new BigNumberJS(afterBalance.sub(startBalance).toString()).div(new BigNumberJS(10).pow(18)).toFixed());
  }

  return { onZap: handleZap, onZapIn: handleZapIn };
};

export default useZap;
