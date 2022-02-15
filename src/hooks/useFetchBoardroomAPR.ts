import {useEffect, useState} from 'react';
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = (version: number) => {
  const [apr, setApr] = useState<number>(0);
  const empFinance = useEmpFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await empFinance.getBoardroomAPR(version));
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, empFinance, slowRefresh, version]);

  return apr;
};

export default useFetchBoardroomAPR;
