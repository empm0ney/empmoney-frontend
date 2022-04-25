import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useEmpFinance from '../../hooks/useEmpFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';

const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const empFinance = useEmpFinance();

  const empBalance = useTokenBalance(empFinance.EMP);
  const displayEmpBalance = useMemo(() => getDisplayBalance(empBalance), [empBalance]);

  const bshareBalance = useTokenBalance(empFinance.ESHARE);
  const displayEshareBalance = useMemo(() => getDisplayBalance(bshareBalance), [bshareBalance]);

  const bbondBalance = useTokenBalance(empFinance.EBOND);
  const displayBbondBalance = useMemo(() => getDisplayBalance(bbondBalance), [bbondBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="Wallet Balances" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol size={100} symbol="EMP" />
          <StyledBalance>
            <StyledValue>{displayEmpBalance}</StyledValue>
            <Label text="EMP" color="#1d48b6" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="ESHARE" />
          <StyledBalance>
            <StyledValue>{displayEshareBalance}</StyledValue>
            <Label text="ESHARE" color="#1d48b6" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="EBOND" />
          <StyledBalance>
            <StyledValue>{displayBbondBalance}</StyledValue>
            <Label text="EBOND" color="#1d48b6" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  color: white;
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // margin-bottom: 1rem;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;

export default AccountModal;
