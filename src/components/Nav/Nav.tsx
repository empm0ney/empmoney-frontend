import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Container,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';
import useEmpStats from '../../hooks/useEmpStats';
import useEthStats from '../../hooks/useEthStats';
import useShareStats from '../../hooks/useeShareStats';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

import empLogo from '../../assets/img/emp-logo-final.gif';
import { roundAndFormatNumber } from '../../0x';
import useBnbStats from '../../hooks/useBnbStats';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { ReactComponent as IconTwitter } from '../../assets/img/twitter.svg';
import { ReactComponent as IconGithub } from '../../assets/img/github.svg';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#1d48b6',
    'background-color': 'rgb(8, 9, 13, 0.9)',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Poppins",sans-serif!important',
    fontSize: '0px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#1d48b6',
    fontSize: '14px',
    // fontWeight: 'bold',
    fontFamily: '"Poppins",sans-serif!important',
    marginTop: '15px',
    margin: theme.spacing(10, 1, 1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#d48b6',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: 'white',
    // backgroundColor: 'rgb(8, 9, 13, 0.9)',
    textAlign: 'center',
    height: '5rem',
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:1200px)');
  const matchesLarge = useMediaQuery('(min-width:1440px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const empStats = useEmpStats();
  const btcStats = useEthStats();
  const bnbStats = useBnbStats();
  const shareStats = useShareStats();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const btcPriceInDollars = useMemo(() => (btcStats ? Number(btcStats).toFixed(2) : null), [btcStats]);
  const bnbPriceInDollars = useMemo(() => (bnbStats ? Number(bnbStats).toFixed(2) : null), [bnbStats]);
  const empPriceInDollars = useMemo(
    () => (empStats ? Number(empStats.priceInDollars).toFixed(2) : null),
    [empStats],
  );
  const sharePriceInDollars = useMemo(
    () => (shareStats ? Number(shareStats.priceInDollars).toFixed(2) : null),
    [shareStats],
  );

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: '0', marginBottom: '-10px', marginLeft: '-10px' }} className={classes.toolbarTitle}>
              {/* <a className={ classes.brandLink } href="/">Emp Money</a> */}
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img alt="emp.money" src={empLogo} height="80px" />
              </Link>
            </Typography>
            <Box style={{ paddingLeft: '0', paddingTop: '2px', fontSize: '1rem', flexGrow: '1' }}>
              <Link to="/" className={'navLink ' + classes.link}>
                Home
              </Link>
              <Link to="/farm" className={'navLink ' + classes.link}>
                Farm
              </Link>
              <Link to="/stake" className={'navLink ' + classes.link}>
                Stake
              </Link>
              <Link to="/detonator" className={'navLink ' + classes.link}>
                Detonator
              </Link>
              <Link to="/farm/EmpMasterNode" className={'navLink ' + classes.link}>
                Nodes
              </Link>
              <Link to="/boardroomV2" className={'navLink ' + classes.link}>
                Boardroom
              </Link>
              <Link to="/bond" className={'navLink ' + classes.link}>
                Bond
              </Link>

              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link> */}
              {/* <Link to="/liquidity" className={'navLink ' + classes.link}>
                Liquidity
              </Link> */}
              {/* <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              <a href="https://yieldwolf.finance/bsc/emp-money" className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                AutoVaults
              </a>
              <a href="https://empmoneyv2.gitbook.io/emp.money/" className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                Docs
              </a>
              {/* <a href="https://empmoneyv2.gitbook.io/emp.money/" className={'navLink ' + classes.link} rel="noopener" target="_blank">
                Docs
              </a> */}
            </Box>

            <Box
              style={{
                flexGrow: '0',
                paddingLeft: '0px',
                paddingTop: '0px',
                fontSize: '14px',
                // fontWeight: 'bold',
                fontFamily: '"Poppins",sans-serif!important',
                paddingRight: '6px',
                height: '30px',
                display: 'flex',
              }}
            >
              <a href="https://dexscreener.com/bsc/0x84821bb588f049913dc579dc511e5e31eb22d5e4" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                <div className="navTokenIcon emp"></div>{' '}
                <div className="navTokenPrice">${roundAndFormatNumber(Number(empPriceInDollars), 2)}</div>
              </a>
              <a href="https://dexscreener.com/bsc/0x1747af98ebf0b22d500014c7dd52985d736337d2" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                <div className="navTokenIcon bshare"></div>{' '}
                <div className="navTokenPrice">${roundAndFormatNumber(Number(sharePriceInDollars), 0)}</div>
              </a>
              {matchesLarge && <a href="https://dexscreener.com/bsc/0x63b30de1a998e9e64fd58a21f68d323b9bcd8f85" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                <div className="navTokenIcon btc"></div>{' '}
                <div className="navTokenPrice">${roundAndFormatNumber(Number(btcPriceInDollars), 0)}</div>
              </a>}
              {matchesLarge && <a href="https://dexscreener.com/bsc/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                <div className="navTokenIcon bnb"></div>{' '}
                <div className="navTokenPrice">${roundAndFormatNumber(Number(bnbPriceInDollars), 0)}</div>
              </a>}
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <img
              alt="emp.money"
              src={empLogo}
              style={{ height: '60px', marginTop: '5px', marginLeft: '10px', marginRight: '15px' }}
            />
            <div style={{ margin: 'auto auto' }}>{' '}</div>
            <AccountButton text="Connect" />
            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon htmlColor="white" />
                  ) : (
                    <ChevronLeftIcon htmlColor="white" />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farm" to="/farm" />
                <ListItemLink primary="Stake" to="/stake" />
                <ListItemLink primary="Detonator" to="/detonator" />
                <ListItemLink primary="Nodes" to="/farm/EmpMasterNode" />
                <ListItemLink primary="Boardroom" to="/boardroomV2" />
                <ListItemLink primary="Bond" to="/bond" />
                {/* <ListItemLink primary="SBS" to="/sbs" /> */}
                {/* <ListItemLink primary="Liquidity" to="/liquidity" /> */}
                {/* <ListItemLink primary="Regulations" to="/regulations" /> */}
                <ListItem button component="a" href="https://yieldwolf.finance/bsc/emp-money">
                  <ListItemText>AutoVaults</ListItemText>
                </ListItem>
                <ListItem button component="a" href="https://empmoneyv2.gitbook.io/emp.money/">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
              </List>
              <footer className={classes.footer}>
                <Container maxWidth={false} style={{ padding: '0' }}>
                  <Grid item style={{ textAlign: 'left', height: '20px', padding: '0' }}>
                    <Box
                      style={{
                        flexGrow: '0',
                        paddingLeft: '8px',
                        paddingTop: '0px',
                        fontSize: '14px',
                        // fontWeight: 'bold',
                        fontFamily: '"Poppins",sans-serif!important',
                        height: '5px',
                        display: 'flex',
                      }}
                    >
                      <a href="https://dexscreener.com/bsc/0x84821bb588f049913dc579dc511e5e31eb22d5e4" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                        <div className="navTokenIcon emp"></div>{' '}
                        <div className="navTokenPrice">${roundAndFormatNumber(Number(empPriceInDollars), 2)}</div>
                      </a>
                      <a href="https://dexscreener.com/bsc/0x1747af98ebf0b22d500014c7dd52985d736337d2" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                        <div className="navTokenIcon bshare"></div>{' '}
                        <div className="navTokenPrice">${roundAndFormatNumber(Number(sharePriceInDollars), 0)}</div>
                      </a>
                    </Box>
                    {/* <Box
                      style={{
                        flexGrow: '0',
                        paddingLeft: '8px',
                        paddingTop: '0px',
                        fontSize: '14px',
                        // fontWeight: 'bold',
                        fontFamily: '"Poppins",sans-serif!important',
                        height: '5px',
                        display: 'flex',
                      }}
                    >
                      <a href="https://dexscreener.com/bsc/0x63b30de1a998e9e64fd58a21f68d323b9bcd8f85" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                        <div className="navTokenIcon btc"></div>{' '}
                        <div className="navTokenPrice">${roundAndFormatNumber(Number(btcPriceInDollars), 0)}</div>
                      </a>
                      <a href="https://dexscreener.com/bsc/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', textDecoration: 'none' }}>
                        <div className="navTokenIcon bnb"></div>{' '}
                        <div className="navTokenPrice">${roundAndFormatNumber(Number(bnbPriceInDollars), 0)}</div>
                      </a>
                    </Box> */}
                    <div style={{ height: '45px' }}>{' '}</div>
                    <div>
                      <a
                        href="https://twitter.com/empmoneybsc"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={classes.link}
                      >
                        <IconTwitter style={{ fill: '#dddfee' }} />
                      </a>
                      <a href="https://github.com/empm0ney/empmoney-frontend" rel="noopener noreferrer" target="_blank" className={classes.link}>
                        <IconGithub style={{ fill: '#dddfee', height: '20px' }} />
                      </a>
                      <a href="https://t.me/empmoney" rel="noopener noreferrer" target="_blank" className={classes.link}>
                        <IconTelegram style={{ fill: '#dddfee', height: '20px' }} />
                      </a>
                      <a href="https://discord.gg/9wDDa26Z6e" rel="noopener noreferrer" target="_blank" className={classes.link}>
                        <IconDiscord style={{ fill: '#dddfee', height: '20px' }} />
                      </a>
                    </div>
                  </Grid>
                </Container>
              </footer>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
