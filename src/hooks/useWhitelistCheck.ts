import { useWallet } from 'use-wallet';
import { useEffect, useState } from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useWhitelistCheck = () => {
  const { slowRefresh } = useRefresh();
  const [isWhitelisted, setWhitelisted] = useState(false);
  const empFinance = useEmpFinance();
  const { account } = useWallet()

  useEffect(() => {
    const fetch = async () => {
      const check = await empFinance.isWhitelisted(account);
      setWhitelisted(check.valueOf());
    }
    if (empFinance && account) fetch();
  }, [empFinance, slowRefresh]);

  return isWhitelisted;
};

export default useWhitelistCheck;
