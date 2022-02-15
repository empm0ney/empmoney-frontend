import {useCallback} from 'react';
import useEmpFinance from './useEmpFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideEmpEthLP = () => {
  const empFinance = useEmpFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideEmpEthLP = useCallback(
    (ftmAmount: string, empAmount: string) => {
      const empAmountBn = parseUnits(empAmount);
      const ftmAmountBn = parseUnits(ftmAmount);
      handleTransactionReceipt(
        empFinance.provideEmpEthLP(ftmAmountBn, empAmountBn),
        `Provide EMP-ETH LP ${empAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [empFinance, handleTransactionReceipt],
  );
  return {onProvideEmpEthLP: handleProvideEmpEthLP};
};

export default useProvideEmpEthLP;
