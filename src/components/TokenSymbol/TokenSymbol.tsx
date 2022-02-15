import React from 'react';

//Graveyard ecosystem logos
import empLogo from '../../assets/img/emp-final2.gif';
import tShareLogo from '../../assets/img/eshares-final2.gif';
import empLogoPNG from '../../assets/img/emp-final2.gif';
import tShareLogoPNG from '../../assets/img/eshares-final2.gif';
import tBondLogo from '../../assets/img/emp-bond-final.gif';

import empFtmLpLogo from '../../assets/img/emp-eth-lp.png';
import empEshareLpLogo from '../../assets/img/emp-eshares-lp.png';
import bshareFtmLpLogo from '../../assets/img/eshares-bnb-lp.png';

import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/eth-logo.png';

const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  EMP: empLogo,
  EMPPNG: empLogoPNG,
  ESHAREPNG: tShareLogoPNG,
  ESHARE: tShareLogo,
  EBOND: tBondLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SETH: btcLogo,
  ETH: btcLogo,
  SVL: bnbLogo,
  'ETH-BNB-LP': empFtmLpLogo,
  'EMP-ETH-LP': empFtmLpLogo,
  'EMP-ESHARE-LP': empEshareLpLogo,
  'ESHARE-BNB-LP': bshareFtmLpLogo,
  'ESHARE-BNB-APELP': bshareFtmLpLogo,
  'EMP-ETH-APELP': empFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 75}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
