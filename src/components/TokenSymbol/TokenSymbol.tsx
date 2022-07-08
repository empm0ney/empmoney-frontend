import React from 'react';

//Graveyard ecosystem logos
import empLogo from '../../assets/img/emp_animated.gif';
import tShareLogo from '../../assets/img/eshares-final2.gif';
import empLogoPNG from '../../assets/img/emp-new.png';
import tShareLogoPNG from '../../assets/img/eshares-final2.gif';
import tBondLogo from '../../assets/img/emp-bond-final.gif';
import empNodePNG from '../../assets/img/detonator.png';

import empFtmLpLogo from '../../assets/img/animated-pair.gif';
import empEshareLpLogo from '../../assets/img/emp-eshares-lp.png';
import bshareFtmLpLogo from '../../assets/img/eshares-bnb-lp.png';
import bshareMdbLpLogo from '../../assets/img/eshares-mdb-lp.png';

import bnbLogo from '../../assets/img/bnb.png';
import sethLogo from '../../assets/img/eth-final.png';
import ethLogo from '../../assets/img/eth-logo.png';

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
  SETH: sethLogo,
  ETH: ethLogo,
  SVL: bnbLogo,
  EMPNODE: empNodePNG,
  'ETH-BNB-LP': empFtmLpLogo,
  'EMP-ETH-LP': empFtmLpLogo,
  'EMP-ESHARE-LP': empEshareLpLogo,
  'ESHARE-BNB-LP': bshareFtmLpLogo,
  'ESHARE-BNB-APELP': bshareFtmLpLogo,
  'EMP-ETH-APELP': empFtmLpLogo,
  'ESHARE-MDB+ LP': bshareMdbLpLogo,
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
