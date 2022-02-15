import React, {/*useCallback, useEffect, */ useMemo, useState} from 'react';
import Page from '../../components/Page';
import BondImage from '../../assets/img/pit.png';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import {Box, /* Paper, Typography,*/ Button, Grid} from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useEmpFinance from '../../hooks/useEmpFinance';
import {getDisplayBalance /*, getBalance*/} from '../../utils/formatBalance';
import {BigNumber /*, ethers*/} from 'ethers';
import useSwapEBondToEShare from '../../hooks/EShareSwapper/useSwapEBondToEShare';
import useApprove, {ApprovalState} from '../../hooks/useApprove';
import useEShareSwapperStats from '../../hooks/EShareSwapper/useEShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BondImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #10131e;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const empFinance = useEmpFinance();
  const [bbondAmount, setBbondAmount] = useState('');
  const [bshareAmount, setEshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(empFinance.EBOND, empFinance.contracts.EShareSwapper.address);
  const {onSwapEShare} = useSwapEBondToEShare();
  const bshareSwapperStat = useEShareSwapperStats(account);

  const bshareBalance = useMemo(
    () => (bshareSwapperStat ? Number(bshareSwapperStat.bshareBalance) : 0),
    [bshareSwapperStat],
  );
  const bondBalance = useMemo(
    () => (bshareSwapperStat ? Number(bshareSwapperStat.bbondBalance) : 0),
    [bshareSwapperStat],
  );

  const handleEBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setBbondAmount('');
      setEshareAmount('');
      return;
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setBbondAmount(e.currentTarget.value);
    const updateEShareAmount = await empFinance.estimateAmountOfEShare(e.currentTarget.value);
    setEshareAmount(updateEShareAmount);
  };

  const handleEBondSelectMax = async () => {
    setBbondAmount(String(bondBalance));
    const updateEShareAmount = await empFinance.estimateAmountOfEShare(String(bondBalance));
    setEshareAmount(updateEShareAmount);
  };

  const handleEShareSelectMax = async () => {
    setEshareAmount(String(bshareBalance));
    const rateESharePerEmp = (await empFinance.getEShareSwapperStat(account)).rateESharePerEmp;
    const updateEBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateESharePerEmp))
      .mul(Number(bshareBalance) * 1e6);
    setBbondAmount(getDisplayBalance(updateEBondAmount, 18, 6));
  };

  const handleEShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setEshareAmount('');
      setBbondAmount('');
      return;
    }
    if (!isNumeric(inputData)) return;
    setEshareAmount(inputData);
    const rateESharePerEmp = (await empFinance.getEShareSwapperStat(account)).rateESharePerEmp;
    const updateEBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateESharePerEmp))
      .mul(Number(inputData) * 1e6);
    setBbondAmount(getDisplayBalance(updateEBondAmount, 18, 6));
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="EBond -> EShare Swap" subtitle="Swap EBond to EShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>EBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={empFinance.EBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleEBondSelectMax}
                                onChange={handleEBondChange}
                                value={bbondAmount}
                                max={bondBalance}
                                symbol="EBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} EBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg" />
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>EShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={empFinance.ESHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleEShareSelectMax}
                                onChange={handleEShareChange}
                                value={bshareAmount}
                                max={bshareBalance}
                                symbol="EShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bshareBalance} ESHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                        {approveStatus !== ApprovalState.APPROVED ? (
                          <Button
                            disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                            color="primary"
                            variant="contained"
                            onClick={approve}
                            size="medium"
                          >
                            Approve EBOND
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSwapEShare(bbondAmount.toString())}
                            size="medium"
                          >
                            Swap
                          </Button>
                        )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
