import ERC20 from './ERC20';

export type ContractName = string;

export interface BankInfo {
  name: string;
  poolId: number;
  sectionInUI: number;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
  closedForStaking: boolean;
}

export interface Bank extends BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type PoolStats = {
  userDailyAPR?: string;
  userYearlyAPR?: string;
  dailyAPR: string;
  yearlyAPR: string;
  TVL: string;
};

export type TokenStat = {
  tokenInETH: string;
  priceInDollars: string;
  totalSupply: string;
  circulatingSupply: string;
};

export type LPStat = {
  tokenAmount: string;
  ftmAmount: string;
  priceOfOne: string;
  totalLiquidity: string;
  totalSupply: string;
};

export type AllocationTime = {
  from: Date;
  to: Date;
};

export type EShareSwapperStat = {
  bshareBalance: string;
  bbondBalance: string;
  // empPrice: string;
  // bsharePrice: string;
  rateESharePerEmp: string;
};

export type Call = {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}