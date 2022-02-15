import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useTransactionAdder } from '../state/transactions/hooks';
import useEmpFinance from './useEmpFinance';
import useApprove from './useApprove';
import { addTransaction } from '../state/transactions/actions';
import useBank from './useBank';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveStrategy(): [ApprovalState, () => Promise<void>] {
  const empFinance = useEmpFinance();
  const { EShareRewardPool, Strategy, BoardroomV2 } = empFinance.contracts;
  const bankEmpLP = useBank('EmpEthEShareRewardPool');
  const bankEshareLP = useBank('EShareBnbEShareRewardPool');
  const [approveStatusStrategy, approveStrategy] = useApprove(empFinance.EMP, Strategy.address);
  const [approveStatusStrategy2, approveStrategy2] = useApprove(empFinance.ESHARE, Strategy.address);
  const [approveStatusBoardroom, approveBoardroom] = useApprove(empFinance.ESHARE, BoardroomV2.address);
  const [approveStatusEmpPair, approveEmpPair] = useApprove(bankEmpLP.depositToken, EShareRewardPool.address);
  const [approveStatusEsharePair, approveEsharePair] = useApprove(bankEshareLP.depositToken, EShareRewardPool.address);

  const approvalState: ApprovalState = useMemo(() => {
    return approveStatusStrategy === ApprovalState.APPROVED && approveStatusStrategy2 === ApprovalState.APPROVED && approveStatusBoardroom === ApprovalState.APPROVED && approveStatusEmpPair === ApprovalState.APPROVED && approveStatusEsharePair === ApprovalState.APPROVED
     ? ApprovalState.APPROVED
     : ApprovalState.NOT_APPROVED;
  }, [approveStatusStrategy, approveStatusStrategy2, approveStatusBoardroom, approveStatusEmpPair, approveStatusEsharePair]);

  const approve = useCallback(async (): Promise<void> => {
    if (
      approveStatusStrategy !== ApprovalState.NOT_APPROVED &&
      approveStatusStrategy2 !== ApprovalState.NOT_APPROVED &&
      approveStatusBoardroom !== ApprovalState.NOT_APPROVED &&
      approveStatusEmpPair !== ApprovalState.NOT_APPROVED &&
      approveStatusEsharePair !== ApprovalState.NOT_APPROVED
    ) {
      console.error('approve was called unnecessarily');
      return;
    }

    if (approveStatusStrategy !== ApprovalState.APPROVED)
      await approveStrategy();
    if (approveStatusStrategy2 !== ApprovalState.APPROVED)
      await approveStrategy2();
    if (approveStatusBoardroom !== ApprovalState.APPROVED)
      await approveBoardroom();
    if (approveStatusEmpPair !== ApprovalState.APPROVED)
      await approveEmpPair();
    if (approveStatusEsharePair !== ApprovalState.APPROVED)
      await approveEsharePair();
  }, [approveStatusStrategy, approveStatusStrategy2, approveStatusBoardroom, approveStatusEmpPair, approveStatusEsharePair]);

  return [approvalState, approve];
}

export default useApproveStrategy;
