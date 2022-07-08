import { useState, useEffect, useCallback } from 'react'
import { Contract, Provider } from 'ethers-multicall';
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import useEmpFinance from './useEmpFinance';
import useRefresh from './useRefresh'
import { claim, compound, deposit, getDepositMultiplier, getNumCompoundTicketsRemaining, getNumDepositTicketsRemaining, getNumTicketsTotal, getLotteryTime, getPastRandomWinners, getContractInfoTotals, getDayDripEstimate, getGlassBalance, getGlassBalancePool, getLargestDayDepositor, getTimeToReward, getTotalDeposited, getTotalRewards, getUserInfo, getUserInfoTotals, getLargestTime, getLotteryMin, getNumRandQualified, getTotalUsers, getDepositEvents, getDayDeposits, getDayTime, getDayTimeIncrement, getPastLargestDepositor, getLargestDeposit, getWhaleTax, getReferralRewards } from '../utils/detonatorUtils'
import { getDefaultProvider } from '../utils/provider';

export const useClaimLottery = () => {
  const { Detonator } = useEmpFinance().contracts;

  const handleClaim = useCallback(async () => {
    try {
      const txHash = await claim(Detonator)
      return txHash
    } catch (e) {
      return false
    }
  }, [Detonator])

  return { onClaim: handleClaim }
}

export const useCompoundLottery = () => {
  const { Detonator } = useEmpFinance().contracts;

  const handleCompound = useCallback(async (manualGas = false) => {
    try {
      const txHash = await compound(Detonator, manualGas)
      return txHash
    } catch (e) {
      return false
    }
  }, [Detonator])

  return { onCompound: handleCompound }
}

export const useDepositLottery = () => {
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;

  const handleDeposit = useCallback(
    async (amount: string) => {
      try {
        const txHash = await deposit(Detonator, amount, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, Detonator],
  )

  return { onDeposit: handleDeposit }
}

export const useTotalRewards = () => {
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;
  const [rewards, setRewards] = useState(new BigNumber(0))
  const { instantRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalRewards(Detonator, account)
      setRewards(new BigNumber(res.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [Detonator, account, instantRefresh, setRewards])

  return rewards
}

export const usePoolBalance = () => {
  const [poolBalance, setPoolBalance] = useState(new BigNumber(0))
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getGlassBalancePool(Detonator)
      setPoolBalance(new BigNumber(res.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, slowRefresh, setPoolBalance])

  return poolBalance
}

export const useTotalDeposited = (scaled = true) => {
  const [totalDeposited, setTotalDeposited] = useState(new BigNumber(0))
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalDeposited(Detonator, scaled)
      setTotalDeposited(new BigNumber(res.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, slowRefresh, scaled, setTotalDeposited])

  return totalDeposited
}

export const useGlassBalance = (account: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const token = useEmpFinance().EMPETH_LP;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getGlassBalance(token, account)
      setBalance(new BigNumber(res.toString()))
    }

    if (token && account) {
      fetchBalance()
    }
  }, [token, fastRefresh, account, setBalance])

  return balance
}

export const useTimeToReward = () => {
  const [timeToReward, setTimeToReward] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTimeToReward(Detonator)
      setTimeToReward(res)
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, fastRefresh, setTimeToReward])

  return timeToReward
}

export const useLargestTime = (prevRounds = 0) => {
  const [rewardTime, setRewardTime] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      // const timestamps: string[] = []
      // const [time, increment] = await Promise.all([getLargestTime(Detonator), prevRounds > 0 ? getLargestTimeIncrement(Detonator) : new Promise((resolve) => resolve(0))])

      // for (let i = 0; i < prevRounds + 1; i++) {
      //   timestamps[i] = String(+time - (+increment * i))
      // }

      setRewardTime((await getLargestTime(Detonator)).toString())
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, prevRounds, setRewardTime])

  return rewardTime
}

export const useDayTime = (prevRound = 0) => {
  const [rewardTime, setRewardTime] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh, slowRefresh } = useRefresh()
  const refresh = prevRound < 2 ? fastRefresh : slowRefresh

  useEffect(() => {
    const fetchBalance = async () => {
      const increment = prevRound > 0 ? await getDayTimeIncrement(Detonator) : 0;
      const res = +await getDayTime(Detonator) - (+increment * prevRound)
      setRewardTime(String(res))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [refresh, Detonator, prevRound, setRewardTime])

  return rewardTime
}

export const useLotteryTime = () => {
  const [lotteryTime, setLotteryTime] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getLotteryTime(Detonator)
      setLotteryTime(res.toString())
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, fastRefresh, setLotteryTime])

  return lotteryTime
}

export const useLotteryMin = () => {
  const [lotteryMin, setLotteryMin] = useState(new BigNumber('0'))
  const { Detonator } = useEmpFinance().contracts;

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getLotteryMin(Detonator)
      setLotteryMin(new BigNumber(res.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, setLotteryMin])

  return lotteryMin
}

export const useNumDepositTicketsRemaining = () => {
  const [lotteryMin, setLotteryMin] = useState(new BigNumber('0'))
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNumDepositTicketsRemaining(Detonator, account)
      setLotteryMin(new BigNumber(res.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [slowRefresh, Detonator, setLotteryMin, account])

  return lotteryMin
}

export const useDayDeposits = () => {
  const [dayDeposits, setDayDeposits] = useState(new BigNumber('0'))
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getDayDeposits(Detonator, account)
      setDayDeposits(new BigNumber(res.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setDayDeposits, account])

  return dayDeposits
}

export const useReferralRewards = () => {
  const [rewards, setRewards] = useState(new BigNumber('0'))
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getReferralRewards(Detonator, account)
      setRewards(new BigNumber(res.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setRewards, account])

  return rewards
}

export const useNumCompoundTicketsRemaining = () => {
  const [lotteryMin, setLotteryMin] = useState(new BigNumber('0'))
  const { account } = useWallet()
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNumCompoundTicketsRemaining(Detonator, account)
      setLotteryMin(new BigNumber(res.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [slowRefresh, Detonator, setLotteryMin, account])

  return lotteryMin
}

export const useGetRandQualified = () => {
  const [randQualified, setRandQualified] = useState(new BigNumber('0'))
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNumRandQualified(Detonator)
      setRandQualified(new BigNumber(res.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [slowRefresh, Detonator, setRandQualified])

  return randQualified
}

export const useLargestDayDepositor = () => {
  const [largestDayDepositer, setLargestDayDepositer] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { instantRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const depositer = await getLargestDayDepositor(Detonator)
      setLargestDayDepositer(depositer)
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [instantRefresh, Detonator, setLargestDayDepositer])

  return largestDayDepositer
}

export const usePastLargestWinner = (prevRound = 0) => {
  const [largestDayDepositer, setLargestDayDepositer] = useState('')
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const largestTime = await getLargestTime(Detonator)
      const addr = await getPastLargestDepositor(Detonator, +largestTime - (+86400 * prevRound))
      setLargestDayDepositer(addr)
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setLargestDayDepositer, prevRound])

  return largestDayDepositer
}

export const useDayDripEstimate = () => {
  const [dayDripEstimate, setDayDripEstimate] = useState(new BigNumber(0))
  const { Detonator } = useEmpFinance().contracts;
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const deposit = await getDayDripEstimate(Detonator, account)
      setDayDripEstimate(new BigNumber(deposit.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setDayDripEstimate, account])

  return dayDripEstimate
}

export const useDepositMultiplier = () => {
  const [dayDripEstimate, setDayDripEstimate] = useState(new BigNumber(0))
  const { Detonator } = useEmpFinance().contracts;

  useEffect(() => {
    const fetchBalance = async () => {
      const deposit = await getDepositMultiplier(Detonator)
      setDayDripEstimate(new BigNumber(deposit.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [Detonator, setDayDripEstimate])

  return dayDripEstimate
}

export const useNumTicketsTotal = () => {
  const [numTickets, setNumTickets] = useState(new BigNumber(0))
  const { Detonator } = useEmpFinance().contracts;
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rewards = await getNumTicketsTotal(Detonator, account)
      setNumTickets(new BigNumber(rewards.toString()))
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setNumTickets, account])

  return numTickets
}

export const useDepositEvents = () => {
  const [events, setEvents] = useState([])
  const { Detonator } = useEmpFinance().contracts;
  const { fastRefresh } = useRefresh()
  const provider = getDefaultProvider();

  useEffect(() => {
    const fetch = async () => {

      const block = await provider.getBlockNumber();
      const e = await getDepositEvents(Detonator, block - 4995, block)
      setEvents(e)
    }

    if (Detonator && provider) {
      fetch()
    }
  }, [fastRefresh, Detonator, provider])

  return events
}

export const useGetContractInfo = () => {
  const [contractInfo, setContractInfo] = useState({} as any)
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const info = await getContractInfoTotals(Detonator)
      setContractInfo(info)
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [slowRefresh, Detonator, setContractInfo])

  return contractInfo
}

export const useGetUserInfoTotals = () => {
  const [userInfoTotals, setUserInfoTotals] = useState({} as any)
  const { Detonator } = useEmpFinance().contracts;
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const info = await getUserInfoTotals(Detonator, account)
      setUserInfoTotals(info)
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setUserInfoTotals, account])

  return userInfoTotals
}

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState({} as any)
  const { Detonator } = useEmpFinance().contracts;
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const info = await getUserInfo(Detonator, account)
      setUserInfo(info)
    }

    if (Detonator && account) {
      fetchBalance()
    }
  }, [fastRefresh, Detonator, setUserInfo, account])

  return userInfo
}

export const usePastRandomWinners = (prevRound = 1) => {
  const [pastRandomWinner, setPastRandomWinner] = useState([])
  const { Detonator } = useEmpFinance().contracts;
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const lotteryTime = await getLotteryTime(Detonator)
      const info = await getPastRandomWinners(Detonator, +lotteryTime - (+86400 * prevRound))
      setPastRandomWinner(info)
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [slowRefresh, Detonator, setPastRandomWinner, prevRound])

  return pastRandomWinner
}

export const useLargestDeposit = () => {
  const [largestQualified, setLargestQualified] = useState(new BigNumber(0))
  const empFinance = useEmpFinance()
  const { Detonator } = empFinance.contracts;
  const { instantRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {

      const data = await getLargestDeposit(Detonator)
      setLargestQualified(new BigNumber(data.toString()))
    }

    if (Detonator) {
      fetchBalance()
    }
  }, [instantRefresh, Detonator, empFinance, setLargestQualified])

  return largestQualified
}

export const useWhaleTax = () => {
  const [whaleTax, setWhaleTax] = useState(new BigNumber(0))
  const empFinance = useEmpFinance()
  const { Detonator } = empFinance.contracts;

  useEffect(() => {
    const fetchBalance = async () => {

      const data = await getWhaleTax(Detonator, empFinance.myAccount)
      setWhaleTax(new BigNumber(data.toString()))
    }

    if (Detonator && empFinance.myAccount) {
      fetchBalance()
    }
  }, [Detonator, empFinance, setWhaleTax,])

  return whaleTax
}

export const useTopDayDeposits = (): any[] => {
  const [users, setUsers] = useState([] as any[])
  const empFinance = useEmpFinance();
  const { Detonator } = empFinance.contracts;
  const provider = getDefaultProvider();
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetch = async () => {
      const ethcallProvider = new Provider(provider, 56);
      const detonator = new Contract(Detonator.address, Detonator.interface.format('full') as string[]);

      const numUsers = Number(await getTotalUsers(Detonator));
      if (!numUsers) return setUsers([]);

      let calls = [];
      for (let i = 0; i < numUsers; i++) {
        calls.push(detonator.userIndices(i))
      }

      const userAddresses = await ethcallProvider.all(calls);
      if (!userAddresses) return setUsers([]);
      calls = [];

      for (let i = 0; i < userAddresses.length; i++) {
        calls.push(detonator.getDayDeposits(userAddresses[i]))
      }

      const dayDeposits = await ethcallProvider.all(calls);
      if (!dayDeposits) return setUsers([]);

      for (let i = 0; i < dayDeposits.length; i++) {
        dayDeposits[i] = { address: calls[i].params[0], day_deposits: dayDeposits[i] };
      }

      const sortedUsers = dayDeposits.sort((d0: any, d1: any) => {
        if (d0.day_deposits.gt(d1.day_deposits)) return -1;
        if (d1.day_deposits.gt(d0.day_deposits)) return 1;
        return 0;
      });

      return setUsers(sortedUsers)
    }

    if (Detonator && provider) {
      fetch()
    }
  }, [setUsers, Detonator, provider, fastRefresh])

  return users

}

export const useSortedUsers = (): any[] => {
  const [users, setUsers] = useState([] as any[])
  const empFinance = useEmpFinance();
  const { Detonator, DetonatorMultiCall } = empFinance.contracts;

  useEffect(() => {
    const fetch = async () => {
      const numUsers = +await getTotalUsers(Detonator);
      if (!numUsers) return setUsers([]);

      let i = 0;
      const increment = 1000;
      const userTotalsData = [];

      while (i < +numUsers) {
        const userIndicies: number[] = [];
        const max = i + increment;

        for (; i < max && i < +numUsers; i++) {
          userIndicies.push(i);
        }

        userTotalsData.push(...(await DetonatorMultiCall.getUsersTotals(userIndicies)));
      }

      const sortedUsers = userTotalsData.sort((u1: any, u2: any) => {
        if (u1.total_deposits_scaled.gt(u2.total_deposits_scaled))
          return -1;
        if (u2.total_deposits_scaled.gt(u1.total_deposits_scaled))
          return 1;
        return 0;
      });

      return setUsers(sortedUsers)
    }

    if (Detonator && DetonatorMultiCall) {
      fetch()
    }
  }, [setUsers, Detonator, DetonatorMultiCall])

  return users

}
