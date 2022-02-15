import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import EmpFinance from '../../emp-finance';
import config from '../../config';

export interface EmpFinanceContext {
  empFinance?: EmpFinance;
}

export const Context = createContext<EmpFinanceContext>({empFinance: null});

export const EmpFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [empFinance, setEmpFinance] = useState<EmpFinance>();

  useEffect(() => {
    if (!empFinance) {
      const emp = new EmpFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        emp.unlockWallet(ethereum, account);
      }
      setEmpFinance(emp);
    } else if (account) {
      empFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, empFinance]);

  return <Context.Provider value={{empFinance}}>{children}</Context.Provider>;
};
