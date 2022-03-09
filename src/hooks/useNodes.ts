import { BigNumber } from 'ethers';
import { useCallback, useState, useEffect } from 'react';
import useEmpFinance from './useEmpFinance';
import config from '../config';

const useNodes = (contract: string, sectionInUI: number, user: string) => {
  const empFinance = useEmpFinance();

  const [poolAPRs, setPoolAPRs] = useState<BigNumber[]>([]);

  const fetchNodes = useCallback(async () => {
    setPoolAPRs(await empFinance.getNodes(contract, user));
  }, [empFinance, contract, user]);

  useEffect(() => {
    if (user && sectionInUI === 3) {
      fetchNodes().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
      const refreshInterval = setInterval(fetchNodes, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [setPoolAPRs, empFinance, fetchNodes, user, sectionInUI]);

  return poolAPRs;
};

export default useNodes;
