import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useEmpFinance from '../../hooks/useEmpFinance';
import {Bank} from '../../emp-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const empFinance = useEmpFinance();
  const isUnlocked = empFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!empFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await empFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          empFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: empFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'EMP' ? empFinance.EMP : empFinance.ESHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [empFinance, setBanks]);

  useEffect(() => {
    if (empFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, empFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
