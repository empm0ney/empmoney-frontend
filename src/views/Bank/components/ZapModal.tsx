import React, { useState, useMemo } from 'react';

import { Button, Select, MenuItem, InputLabel, withStyles } from '@material-ui/core';
// import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import styled from 'styled-components';

import { getDisplayBalance } from '../../../utils/formatBalance';
import Label from '../../../components/Label';
import useLpStats from '../../../hooks/useLpStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useEmpFinance from '../../../hooks/useEmpFinance';
import { useWallet } from 'use-wallet';
import useApproveZapper, { ApprovalState } from '../../../hooks/useApproveZapper';
import { EMP_TICKER, ESHARE_TICKER, BNB_TICKER, ETH_TICKER } from '../../../utils/constants';
import { Alert } from '@material-ui/lab';

interface ZapProps extends ModalProps {
  onConfirm: (zapAsset: string, lpName: string, amount: string) => void;
  tokenName?: string;
  decimals?: number;
}

const ZapModal: React.FC<ZapProps> = ({ onConfirm, onDismiss, tokenName = '', decimals = 18 }) => {
  const empFinance = useEmpFinance();
  const { balance } = useWallet();
  const ftmBalance = (Number(balance) / 1e18).toFixed(4).toString();
  const empBalance = useTokenBalance(empFinance.EMP);
  const bshareBalance = useTokenBalance(empFinance.ESHARE);
  const btcBalance = useTokenBalance(empFinance.ETH);
  const [val, setVal] = useState('');
  const [zappingToken, setZappingToken] = useState(BNB_TICKER);
  const [zappingTokenBalance, setZappingTokenBalance] = useState(ftmBalance);
  const [estimate, setEstimate] = useState({ token0: '0', token1: '0' }); // token0 will always be BNB in this case
  const [approveZapperStatus, approveZapper] = useApproveZapper(zappingToken);
  const empFtmLpStats = useLpStats('EMP-ETH-LP');
  const tShareFtmLpStats = useLpStats('ESHARE-BNB-LP');
  const empLPStats = useMemo(() => (empFtmLpStats ? empFtmLpStats : null), [empFtmLpStats]);
  const bshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const ftmAmountPerLP = tokenName.startsWith(EMP_TICKER) ? empLPStats?.ftmAmount : bshareLPStats?.ftmAmount;
  /**
   * Checks if a value is a valid number or not
   * @param n is the value to be evaluated for a number
   * @returns
   */
  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  const handleChangeAsset = (event: any) => {
    const value = event.target.value;
    setZappingToken(value);
    setZappingTokenBalance(ftmBalance);
    if (event.target.value === ESHARE_TICKER) {
      setZappingTokenBalance(getDisplayBalance(bshareBalance, decimals));
    }
    if (event.target.value === EMP_TICKER) {
      setZappingTokenBalance(getDisplayBalance(empBalance, decimals));
    }
    if (event.target.value === ETH_TICKER) {
      setZappingTokenBalance(getDisplayBalance(btcBalance, decimals));
    }
  };

  const handleChange = async (e: any) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setVal(e.currentTarget.value);
      setEstimate({ token0: '0', token1: '0' });
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setVal(e.currentTarget.value);
    const estimateZap = await empFinance.estimateZapIn(zappingToken, tokenName, String(e.currentTarget.value));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  const handleSelectMax = async () => {
    setVal(zappingTokenBalance);
    const estimateZap = await empFinance.estimateZapIn(zappingToken, tokenName, String(zappingTokenBalance));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  return (
    <Modal>
      <ModalTitle text={`Zap in ${tokenName}`} />

      <StyledActionSpacer />
      <InputLabel style={{ color: '#1d48b6' }} id="label">
        Select Token:
      </InputLabel>
      <br/>
      <Select onChange={handleChangeAsset} style={{ color: 'white' }} labelId="label" id="select" value={zappingToken}>
        <StyledMenuItem value={BNB_TICKER}>BNB</StyledMenuItem>
        <StyledMenuItem value={ETH_TICKER}>ETH</StyledMenuItem>
        <StyledMenuItem value={ESHARE_TICKER}>ESHARE</StyledMenuItem>
        <StyledMenuItem value={EMP_TICKER}>EMP</StyledMenuItem>
      </Select>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={zappingTokenBalance}
        symbol={zappingToken}
      />
      <br/>
      <Label variant="yellow" text="Zap Estimations:" />
      <br/>
      <StyledDescriptionText>
        {' '}
        {tokenName}: {Number(estimate.token0) / Number(ftmAmountPerLP)}
      </StyledDescriptionText>
      {tokenName.startsWith(EMP_TICKER) ?
        <StyledDescriptionText>
          {' '}
          ({Number(estimate.token0)} {tokenName.startsWith(EMP_TICKER) ? ETH_TICKER : EMP_TICKER} /{' '}
          {Number(estimate.token1)} {tokenName.startsWith(EMP_TICKER) ? EMP_TICKER : ETH_TICKER}){' '}
        </StyledDescriptionText>
        :
        <StyledDescriptionText>
          {' '}
          ({Number(estimate.token0)} {tokenName.startsWith(ESHARE_TICKER) ? ESHARE_TICKER : BNB_TICKER} /{' '}
          {Number(estimate.token1)} {tokenName.startsWith(ESHARE_TICKER) ? BNB_TICKER : ESHARE_TICKER}){' '}
        </StyledDescriptionText>}
      <ModalActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            approveZapperStatus !== ApprovalState.APPROVED ? approveZapper() : onConfirm(zappingToken, tokenName, val)
          }
        >
          {approveZapperStatus !== ApprovalState.APPROVED ? 'Approve' : "Let's go"}
        </Button>
      </ModalActions>

      <StyledActionSpacer />
      <Alert variant="outlined" severity="info">
        New feature. Use at your own risk!
      </Alert>
    </Modal>
  );
};

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDescriptionText = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 22px;
  justify-content: flex-start;
`;
const StyledMenuItem = withStyles({
  root: {
    backgroundColor: '#08090d',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
    selected: {
      backgroundColor: 'black',
    },
  },
})(MenuItem);

export default ZapModal;
