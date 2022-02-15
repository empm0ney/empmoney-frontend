import { BigNumber } from 'ethers';
import { ESHARE_TICKER } from './../utils/constants';
import { useCallback } from 'react';
import useEmpFinance from './useEmpFinance';

const useStrategy = () => {
  const empFinance = useEmpFinance();
  const ZERO = BigNumber.from('0');

  const handleStrategy = useCallback(async (percentEmpLP: number = 80, stakeBoardroom: number = 20) => {
    if (!empFinance.myAccount) return;
    const harvestTxs = [];

    if ((await empFinance.canUserClaimRewardFromBoardroom(1)) && (await empFinance.getEarningsOnBoardroom(1)).gt(ZERO))
      harvestTxs.push(await empFinance.harvestCashFromBoardroom(1));
    if ((await empFinance.earnedFromBank('EShareBnbEShareRewardPool', ESHARE_TICKER, 0, empFinance.myAccount)).gt(ZERO))
      harvestTxs.push(await empFinance.harvest('EShareBnbEShareRewardPool', 0));
    if ((await empFinance.earnedFromBank('EmpEthEShareRewardPool', ESHARE_TICKER, 1, empFinance.myAccount)).gt(ZERO))
      harvestTxs.push(await empFinance.harvest('EmpEthEShareRewardPool', 1));

    await Promise.all(harvestTxs.map((tx) => tx.wait()));
    let shareBoardroomAmount = ZERO;
    const zapsCompleted: boolean[] = [];

    for (let retries = 0; retries < 3; retries++) {

      const [empBalance, shareBalance] = await Promise.all([
        empFinance.EMP.balanceOf(empFinance.myAccount),
        empFinance.ESHARE.balanceOf(empFinance.myAccount)
      ]);
      const shareCompoundAmount = stakeBoardroom > 0 ? shareBalance.mul(100 - stakeBoardroom).div(100) : shareBalance;
      shareBoardroomAmount = stakeBoardroom > 0 && !zapsCompleted[1] ? shareBalance.sub(shareCompoundAmount) : ZERO;

      const zapTxs = [];
      let txIndex = 0;

      if (empBalance.gt(BigNumber.from('2000000000000000000')) && !zapsCompleted[0])
        zapTxs.push(await empFinance.zapStrategy(empFinance.EMP.address, empBalance, percentEmpLP, BigNumber.from('1500000').mul(retries + 1)));
      if (shareCompoundAmount.gt(BigNumber.from('500000000000000')) && !zapsCompleted[1])
        zapTxs.push(await empFinance.zapStrategy(empFinance.ESHARE.address, shareCompoundAmount, percentEmpLP, BigNumber.from('1500000').mul(retries + 1)));

      try {
        for (; txIndex < zapTxs.length; txIndex++) {
          zapsCompleted[txIndex] = false;
          const receipt = await zapTxs[txIndex].wait();
          zapsCompleted[txIndex] = receipt.status > 0;
        }
        break;
      } catch (e) { 
        console.error(e);
        zapsCompleted[txIndex] = false;
      }
    }

    const [balanceEMPLP, balanceSHARELP] = await Promise.all([
      empFinance.externalTokens['EMP-ETH-LP'].balanceOf(empFinance.myAccount),
      empFinance.externalTokens['ESHARE-BNB-LP'].balanceOf(empFinance.myAccount)
    ]);

    const stakeTxs = [];

    if (balanceEMPLP.gt(ZERO))
      stakeTxs.push(await empFinance.stake('EmpEthEShareRewardPool', 1, balanceEMPLP));
    if (balanceSHARELP.gt(ZERO))
      stakeTxs.push(await empFinance.stake('EShareBnbEShareRewardPool', 0, balanceSHARELP));
    if (stakeBoardroom > 0 && shareBoardroomAmount.gt(ZERO))
      stakeTxs.push(await empFinance.currentBoardroom(1).stake(shareBoardroomAmount));

    await Promise.all(stakeTxs.map((tx) => tx.wait()));

  }, [empFinance, ZERO]);
  return { onStrategy: handleStrategy };
};

export default useStrategy;
