import React, { useMemo, useState, useEffect } from 'react';
import Page from '../../components/Page';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useEmpStats from '../../hooks/useEmpStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsETH from '../../hooks/useLpStatsETH';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import useeShareStats from '../../hooks/useeShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Emp as empProd, EShare as eShareProd } from '../../emp-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useEmpFinance from '../../hooks/useEmpFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';

import EmpImage from '../../assets/img/emp_animated.gif';
import RugDocImage from '../../assets/img/rugdoc-badge.png';
import ZrxGuardImage from '../../assets/img/0x-guard.png';

import HomeImage from '../../assets/img/background.png';
import useStrategy from '../../hooks/useStrategy';
import useApproveStrategy, { ApprovalState } from '../../hooks/useApproveStrategy';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #10131e;
  }
`;

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const empFtmLpStats = useLpStatsETH('EMP-ETH-LP');
  const eShareFtmLpStats = useLpStats('ESHARE-BNB-LP');
  const empStats = useEmpStats();
  const eShareStats = useeShareStats();
  const tBondStats = useBondStats();
  const empFinance = useEmpFinance();
  const [approvalStateStrategy, approveStrategy] = useApproveStrategy();
  const { onStrategy } = useStrategy()
  const [strategyValue, setStrategyValue] = useState(80);
  const [boardroomValue, setBoardroomValue] = useState(20);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

  function onToggleExpansion() {
    setExpanded(!expanded);
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  async function executeApprovals() {
    try {
      setLoading(true);
      await approveStrategy();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  async function executeStrategy() {
    try {
      setLoading(true);
      await onStrategy(strategyValue, boardroomValue);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleStrategyChange = (event, newValue) => {
    setStrategyValue(Number(newValue));
  };
  const handleBoardroomChange = (event, newValue) => {
    setBoardroomValue(Number(newValue));
  };

  const emp = empProd;
  const eShare = eShareProd;

  const buyEmpAddress =
    'https://pancakeswap.finance/swap?inputCurrency=0x2170Ed0880ac9A755fd29B2688956BD959F933F8&outputCurrency=' +
    emp.address;
  const buyEShareAddress =
    'https://pancakeswap.finance/swap?outputCurrency=' +
    eShare.address;

  const empLPStats = useMemo(() => (empFtmLpStats ? empFtmLpStats : null), [empFtmLpStats]);
  const bshareLPStats = useMemo(() => (eShareFtmLpStats ? eShareFtmLpStats : null), [eShareFtmLpStats]);
  const empPriceInDollars = useMemo(
    () => (empStats ? Number(empStats.priceInDollars).toFixed(2) : null),
    [empStats],
  );
  const empPriceInBNB = useMemo(() => (empStats ? Number(empStats.tokenInETH).toFixed(4) : null), [empStats]);
  const empCirculatingSupply = useMemo(() => (empStats ? String(empStats.circulatingSupply) : null), [empStats]);
  const empTotalSupply = useMemo(() => (empStats ? String(empStats.totalSupply) : null), [empStats]);

  const eSharePriceInDollars = useMemo(
    () => (eShareStats ? Number(eShareStats.priceInDollars).toFixed(2) : null),
    [eShareStats],
  );
  const eSharePriceInBNB = useMemo(
    () => (eShareStats ? Number(eShareStats.tokenInETH).toFixed(4) : null),
    [eShareStats],
  );
  const eShareCirculatingSupply = useMemo(
    () => (eShareStats ? String(eShareStats.circulatingSupply) : null),
    [eShareStats],
  );
  const eShareTotalSupply = useMemo(() => (eShareStats ? String(eShareStats.totalSupply) : null), [eShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInETH).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const empLpZap = useZap({ depositTokenName: 'EMP-ETH-LP' });
  const bshareLpZap = useZap({ depositTokenName: 'ESHARE-BNB-LP' });

  const [onPresentEmpZap, onDissmissEmpZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        empLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissEmpZap();
      }}
      tokenName={'EMP-ETH-LP'}
    />,
  );

  const [onPresentEshareZap, onDissmissEshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissEshareZap();
      }}
      tokenName={'ESHARE-BNB-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
        >
          <img src={EmpImage} alt="emp-logo" style={{ maxHeight: '240px' }} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center' }}>
              <h2>Welcome to Emp</h2>
              <p>
                The algocoin that follows Ethereum's price! Now you can have high yields normally only found on risky assets, but with exposure to the world’s favorite cryptocurrency instead.
              </p>
              <p>
                <strong>EMP is pegged via algorithm to a 4,000:1 ratio to ETH. $40k ETH = $10 EMP PEG</strong>
                {/* Stake your EMP-ETH LP in the Farm to earn ESHARE rewards. Then stake your earned ESHARE in the
                Boardroom to earn more EMP! */}
              </p>
              <p>
                <IconTelegram alt="telegram" style={{ fill: '#dddfee', height: '15px' }} /> Join our{' '}
                <a
                  href="https://t.me/empmoney"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#dddfee' }}
                >
                  Telegram
                </a>{' '}
                to find out more!
              </p>
            </Box>
          </Paper>
        </Grid>

        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={12} justify="center" style={{ margin: '12px', display: 'flex' }}>

            <Alert variant="filled" severity="warning">
              Board<br />
              <b>Please unstake all ESHARE for now. Timer to withdraw will be removed shortly. </b><br />We are very sorry for the inconvenience.

            </Alert>

          </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2 style={{paddingTop: '4px'}}>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
              <div style={{paddingBottom: '18px'}}>{' '}</div>
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              {/* <Button href="/boardroom" className="shinyButton" style={{margin: '10px'}}>
                Stake Now
              </Button>
              <Button href="/farm" className="shinyButton" style={{margin: '10px'}}>
                Farm Now
              </Button> */}
              <Button
                target="_blank"
                href={buyEmpAddress}
                style={{ margin: '10px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy EMP
              </Button>
              <Button
                target="_blank"
                href={buyEShareAddress}
                className={'shinyButton ' + classes.button}
                style={{ margin: '10px' }}
              >
                Buy ESHARE
              </Button>
              <Button
                target="_blank"
                href="https://www.youtube.com/watch?v=rqzoyNXcRsA"
                className={'tutorial ' + classes.button}
                style={{ margin: '10px' }}
              >
                Tutorial
              </Button>
              <Button
                target="_blank"
                href="https://rugdoc.io/"
                className={classes.button}
                style={{ margin: '5px', padding: '0', height: '42px', width: '130px' }}
              >
                <img src={RugDocImage} alt="rugdoc.io" height="65px" style={{ paddingTop: '4px' }} />
              </Button>
              <Button
                target="_blank"
                href="https://github.com/0xGuard-com/audit-reports/blob/master/emp-money/EMP-Money_final-audit-report.pdf"
                className={'zrx ' + classes.button}
                style={{ backgroundColor: '#0c0c0c', marginLeft: '8px', padding: '0', height: '42px', width: '130px' }}
              >
                <img src={ZrxGuardImage} alt="0xguard.com" height="30px" style={{ paddingTop: '2px' }} />
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* EMP */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EMP" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  empFinance.watchAssetInMetamask('EMP');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>EMP</h2>
              4,000 EMP (1.0 Peg) =
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>{empPriceInBNB ? empPriceInBNB : '-.----'} ETH</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${empPriceInDollars ? roundAndFormatNumber(empPriceInDollars, 2) : '-.--'} / EMP
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(empCirculatingSupply * empPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(empCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(empTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* ESHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  empFinance.watchAssetInMetamask('ESHARE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ESHARE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>ESHARE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {eSharePriceInBNB ? eSharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${eSharePriceInDollars ? eSharePriceInDollars : '-.--'} / ESHARE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((eShareCirculatingSupply * eSharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(eShareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(eShareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* EBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  empFinance.watchAssetInMetamask('EBOND');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EBOND" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>EBOND</h2>
              4,000 EBOND
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} ETH
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / EBOND</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ marginBottom: isMobile ? '0' : '5.1rem' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EMP-ETH-LP" />
                </CardIcon>
              </Box>
              <h2>EMP-ETH PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentEmpZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {empLPStats?.tokenAmount ? empLPStats?.tokenAmount : '-.--'} EMP /{' '}
                  {empLPStats?.ftmAmount ? empLPStats?.ftmAmount : '-.--'} ETH
                </span>
              </Box>
              <Box>${empLPStats?.priceOfOne ? empLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${empLPStats?.totalLiquidity ? roundAndFormatNumber(empLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {empLPStats?.totalSupply ? roundAndFormatNumber(empLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <TokenSymbol symbol="EMP" />
                <span style={{ fontSize: '38px' }}>{' ♟️ '}</span>
                <TokenSymbol symbol="ESHARE" />
              </Box>
              <br />
              <h2>Execute Strategy</h2>
              <Box sx={{ width: 225 }}>
                <Typography
                  flexDirection={'row'}
                  flexGrow={1}
                  flexBasis={'space-between'}
                  display={'flex'}
                  sx={{ marginTop: '8px', whiteSpace: 'nowrap' }}
                  fontSize='12px'
                  gutterBottom>
                  <div style={{ flexDirection: 'column', textAlign: 'left' }}>
                    <div>EMP-LP</div>
                    <b style={{ fontSize: '14px' }}>{strategyValue}%</b>
                  </div>
                  <div style={{ width: '100%' }}>{' '}</div>
                  <div style={{ flexDirection: 'column', textAlign: 'right' }}>
                    <div>ESHARE-LP</div>
                    <b style={{ fontSize: '14px' }}>{100 - strategyValue}%</b>
                  </div>
                </Typography>
                <Slider
                  // size='large'
                  aria-label="Zap ratio"
                  defaultValue={80}
                  getAriaValueText={(t) => `${t}%`}
                  valueLabelDisplay="off"
                  value={strategyValue}
                  onChange={handleStrategyChange}
                  step={5}
                  marks
                  min={60}
                  max={100}
                />
                <Slider
                  // size='large'
                  aria-label="Stake boardroom"
                  defaultValue={20}
                  getAriaValueText={(t) => `${t}%`}
                  valueLabelDisplay="off"
                  value={boardroomValue}
                  onChange={handleBoardroomChange}
                  step={5}
                  marks
                  min={0}
                  max={40}
                />
                <Typography
                  flexDirection={'row'}
                  flexGrow={1}
                  flexBasis={'space-between'}
                  display={'flex'}
                  sx={{ marginTop: '0', whiteSpace: 'nowrap' }}
                  fontSize='12px'
                  gutterBottom>
                  <div style={{ flexDirection: 'column', textAlign: 'left' }}>
                    <b style={{ fontSize: '14px' }}>{boardroomValue}%</b>
                    <div>BOARDROOM</div>
                  </div>
                  <div style={{ width: '100%' }}>{' '}</div>
                  <div style={{ flexDirection: 'column', textAlign: 'right' }}>
                    <b style={{ fontSize: '14px' }}>{100 - boardroomValue}%</b>
                    <div>FARMS</div>
                  </div>
                </Typography>
                <Box mt={1}>
                  {!loading ?
                    <Button onClick={() => approvalStateStrategy === ApprovalState.APPROVED ? executeStrategy() : executeApprovals()} className="shinyButtonSecondary">
                      {approvalStateStrategy === ApprovalState.APPROVED ? 'Start' : 'Approve'}
                    </Button>
                    :
                    <div style={{ flexDirection: 'column', flexGrow: 1 }}>
                      <CircularProgress color='inherit' />
                      <div style={{ fontSize: '12px', marginTop: '12px', color: '#155aca' }}><i>Submitting multiple transactions...</i></div>
                    </div>
                  }
                </Box>
              </Box>
              {expanded ? <>
                <Box mt={2}>
                  <span style={{ fontSize: '26px' }}>
                    Strategy Info
                  </span>
                </Box>
                <Box mt={0.75} flexDirection={'row'} flexWrap={0}>
                  <span style={{ fontSize: '12px', flex: '1' }}>
                    Claim farm rewards <br />
                    Claim boardroom rewards <br />
                    Deposit into farms <br />
                    Deposit into boardroom <br />
                  </span>
                  <div style={{ marginTop: '12px', fontSize: '12px' }}>
                    <i>Disclaimer: Uses all liquid EMP & ESHARES in wallet</i>
                  </div>
                  <Button size='small' style={{ marginTop: '16px', color: '#800080',  marginBottom: '-5px' }} onClick={onToggleExpansion}>
                    Collapse
                  </Button>
                </Box>
              </>
                :
                <Button size='small' style={{ marginTop: '16px', color: '#800080', marginBottom: '-5px' }} onClick={onToggleExpansion}>
                  More Info
                </Button>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ marginBottom: isMobile ? '0' : '3.35rem' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ESHARE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>ESHARE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentEshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bshareLPStats?.tokenAmount ? bshareLPStats?.tokenAmount : '-.--'} ESHARE /{' '}
                  {bshareLPStats?.ftmAmount ? bshareLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bshareLPStats?.priceOfOne ? bshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {bshareLPStats?.totalLiquidity ? roundAndFormatNumber(bshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {bshareLPStats?.totalSupply ? roundAndFormatNumber(bshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
