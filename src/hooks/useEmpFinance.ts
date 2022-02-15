import {useContext} from 'react';
import {Context} from '../contexts/BombFinanceProvider';

const useEmpFinance = () => {
  const {empFinance} = useContext(Context);
  return empFinance;
};

export default useEmpFinance;
