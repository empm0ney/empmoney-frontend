import {BigNumber, ethers} from 'ethers';
import {useCallback, useMemo} from 'react';
import {useHasPendingApproval, useTransactionAdder} from '../state/transactions/hooks';
import useAllowance from './useAllowance';
import ERC20 from '../emp-finance/ERC20';
import {BNB_TICKER, BUSD_TICKER, EMP_TICKER, ESHARE_TICKER, ETH_TICKER, ZAPPER_ROUTER_ADDR} from '../utils/constants';
import useEmpFinance from './useEmpFinance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveZapper(zappingToken: string, isZapMDB: boolean): [ApprovalState, () => Promise<void>] {
  const empFinance = useEmpFinance();
  const zapperAddress = isZapMDB 
    ? empFinance.config.deployments.ZapMDB.address 
    : ZAPPER_ROUTER_ADDR;

  let token: ERC20;
  if (zappingToken === BNB_TICKER) token = empFinance.BNB;
  else if (zappingToken === EMP_TICKER) token = empFinance.EMP;
  else if (zappingToken === ESHARE_TICKER) token = empFinance.ESHARE;
  else if (zappingToken === ETH_TICKER) token = empFinance.externalTokens[ETH_TICKER];
  else if (zappingToken === BUSD_TICKER) token = empFinance.externalTokens[BUSD_TICKER];
  const pendingApproval = useHasPendingApproval(token.address, zapperAddress);
  const currentAllowance = useAllowance(token, zapperAddress, pendingApproval);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // we might not have enough data to know whether or not we need to approve
    if (token === empFinance.BNB) return ApprovalState.APPROVED;
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval, token, empFinance]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    const response = await token.approve(zapperAddress, APPROVE_AMOUNT);
    addTransaction(response, {
      summary: `Approve ${token.symbol}`,
      approval: {
        tokenAddress: token.address,
        spender: zapperAddress,
      },
    });
  }, [approvalState, zapperAddress, token, addTransaction]);

  return [approvalState, approve];
}

export default useApproveZapper;
