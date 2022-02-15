import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useEmpFinance from './useEmpFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const empFinance = useEmpFinance();

  useEffect(() => {
    if (empFinance) {
      const {Treasury} = empFinance.contracts;
      empFinance.EMP.balanceOf(Treasury.address).then(setAmount);
    }
  }, [empFinance]);
  return amount;
};

export default useTreasuryAmount;
