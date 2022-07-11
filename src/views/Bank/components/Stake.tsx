import React, { useMemo, useContext, useState } from 'react';
import styled from 'styled-components';

// import Button from '../../../components/Button';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '../../../components/IconButton';
import Value from '../../../components/Value';
import { ThemeContext } from 'styled-components';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useZap from '../../../hooks/useZap';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ZapModal from './ZapModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../emp-finance';
import useNodePrice from '../../../hooks/useNodePrice';
import useNodeText from '../../../hooks/useNodeText';
import useWallet from 'use-wallet';
import { BigNumber } from 'ethers';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const { color: themeColor } = useContext(ThemeContext);
  const tokenBalance = useTokenBalance(bank.depositToken);
  const { account } = useWallet();
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId, bank.sectionInUI, account);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const { getNodeText } = useNodeText();
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const earnedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(bank.sectionInUI !== 3 ? stakedBalance : nodePrice, bank.depositToken.decimal))
  ).toFixed(2);
  const { onStake } = useStake(bank);
  const { onZapIn } = useZap(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      bank={bank}
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount, slippageBp) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZapIn(zappingToken, tokenName, amount, slippageBp, BigNumber.from(0), onStake);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={bank.sectionInUI !== 3 ? stakedBalance : nodePrice}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={bank.sectionInUI !== 3 ? bank.depositToken.symbol : 'EMPNODE'} size={80} />
            </CardIcon>
            <Value value={getDisplayBalance(bank.sectionInUI !== 3 ? stakedBalance : nodePrice, bank.depositToken.decimal, bank.sectionInUI === 3 ? 0 : 4)} />


            {/* <Label text={`≈ $${earnedInDollars}`} /> */} 

            <Typography style={{ textTransform: 'uppercase', color: '#fffff' }}>
              {`≈ $${earnedInDollars}`}
            </Typography>
            <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>
              {`${bank.sectionInUI !== 3 ? bank.depositTokenName : getNodeText(bank.poolId)} ${bank.sectionInUI !== 3 ? 'Staked' : 'Price'}`}
            </Typography>
            {/* <Label text={`${bank.depositTokenName} Staked`} /> */}
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  bank.closedForStaking ||
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                className={
                  bank.closedForStaking ||
                    approveStatus === ApprovalState.PENDING ||
                    approveStatus === ApprovalState.UNKNOWN
                    ? 'shinyButtonDisabled'
                    : 'shinyButton'
                }
                style={{ marginTop: '20px' }}
              >
                {`Approve ${bank.depositTokenName}`}
              </Button>
            ) : (
              <>
                {bank.sectionInUI !== 3 && <><IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                  <StyledActionSpacer />
                  <IconButton
                    disabled={
                      bank.closedForStaking ||
                      bank.depositTokenName === 'EMP-ESHARE-LP' ||
                      // bank.depositTokenName === 'ESHARE-MDB+ LP' ||
                      bank.depositTokenName === 'EMP'
                    }
                    onClick={() => (bank.closedForStaking ? null : onPresentZap())}
                  >
                    <FlashOnIcon style={{ color: themeColor.grey[400] }} />
                  </IconButton>
                  <StyledActionSpacer /> </>}
                <IconButton
                  disabled={bank.closedForStaking}
                  onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
