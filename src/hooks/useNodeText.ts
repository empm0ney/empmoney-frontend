import { useCallback } from 'react';
import useEmpFinance from './useEmpFinance';
import { Bank } from '../emp-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useNodeText = () => {

  const getNodeText = (nodeId: number) => {
    switch (nodeId) {
      case 0: return 'Nano Node';
      case 1: return 'Mini Node';
      case 2: return 'Kilo Node';
      case 3: return 'Mega Node';
      case 4: return 'Giga Node';
        defualt: return '';
    }
  }

  return { getNodeText }
};

export default useNodeText;
