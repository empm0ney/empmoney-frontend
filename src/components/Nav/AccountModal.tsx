import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useEmpFinance from '../../hooks/useEmpFinance';
import TokenSymbol from '../TokenSymbol';
import { useMediaQuery } from '@material-ui/core';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const empFinance = useEmpFinance();

  const empBalance = useTokenBalance(empFinance.EMP);
  const displayEmpBalance = useMemo(() => getDisplayBalance(empBalance, 18, 2), [empBalance]);

  const bshareBalance = useTokenBalance(empFinance.ESHARE);
  const displayEshareBalance = useMemo(() => getDisplayBalance(bshareBalance, 18, 2), [bshareBalance]);

  const bbondBalance = useTokenBalance(empFinance.EBOND);
  const displayBbondBalance = useMemo(() => getDisplayBalance(bbondBalance, 18, 2), [bbondBalance]);

  const empLpBalance = useTokenBalance(empFinance.externalTokens['EMP-ETH-LP']);
  const displayEmpLpBalance = useMemo(() => getDisplayBalance(empLpBalance, 18, 2), [empLpBalance]);

  const eshareLpBalance = useTokenBalance(empFinance.externalTokens['ESHARE-BNB-LP']);
  const displayEshareLpBalance = useMemo(() => getDisplayBalance(eshareLpBalance, 18, 2), [eshareLpBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <ModalTitle text="Wallet Balance" />

        <Balances style={{ display: 'flex', flexDirection: matches ? 'row' : 'column' }}>
          <StyledBalanceWrapper style={{ paddingBottom: '15px' }}>
            <TokenSymbol symbol="EMPPNG" />
            <StyledBalance>
              <StyledValue>{displayEmpBalance}</StyledValue>
              <Label text="EMP" color="#1d48b6" />
            </StyledBalance>
          </StyledBalanceWrapper>

          <StyledBalanceWrapper style={{ paddingBottom: '15px' }}>
            <TokenSymbol symbol="ESHARE" />
            <StyledBalance>
              <StyledValue>{displayEshareBalance}</StyledValue>
              <Label text="ESHARE" color="#1d48b6" />
            </StyledBalance>
          </StyledBalanceWrapper>

          <StyledBalanceWrapper style={{ paddingBottom: '15px' }}>
            <TokenSymbol symbol="EBOND" />
            <StyledBalance>
              <StyledValue>{displayBbondBalance}</StyledValue>
              <Label text="EBOND" color="#1d48b6" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </Balances>

        <Balances style={{ display: 'flex', flexDirection: matches ? 'row' : 'column' }}>
          <StyledBalanceWrapper style={{ paddingBottom: '15px' }}>
            <TokenSymbol symbol="EMP-ETH-LP" />
            <StyledBalance>
              <StyledValue>{displayEmpLpBalance}</StyledValue>
              <Label text="EMP-ETH-LP" color="#1d48b6" />
            </StyledBalance>
          </StyledBalanceWrapper>

          <StyledBalanceWrapper style={{ paddingBottom: '15px' }}>
            <TokenSymbol symbol="ESHARE-BNB-LP" />
            <StyledBalance>
              <StyledValue>{displayEshareLpBalance}</StyledValue>
              <Label text="ESHARE-BNB-LP" color="#1d48b6" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </Balances>
      </div>
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
  margin: 0 24px;
`;

export default AccountModal;
