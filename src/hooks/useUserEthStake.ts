import { useWallet } from 'use-wallet';
import { useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

interface User {
  last_epoch: BigNumber;
  current_balance: BigNumber;
  total_deposits: BigNumber;
  total_claims: BigNumber;
}

const useUserEthStake = () => {
  const { fastRefresh } = useRefresh();
  const empFinance = useEmpFinance();
  const { account } = useWallet();
  const ZERO = BigNumber.from(0);
  const [user, setUser] = useState({
    last_epoch: ZERO,
    current_balance: ZERO,
    total_deposits: ZERO,
    total_claims: ZERO
  } as User);

  useEffect(() => {
    const fetch = async () => {
      const res = await empFinance.getUserEthStake(account);
      setUser(res);
    }

    if (empFinance && account) {
      fetch();
    }
  }, [empFinance, fastRefresh, account]);

  return user;
};

export default useUserEthStake;
