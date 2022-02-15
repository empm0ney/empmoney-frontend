/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js'

export const deposit = async (lotteryContract, amount, account) => {
  try {
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
    const REF_KEY = 'REF_KEY'
    let ref = new RegExp('[?&]ref=([^&#]*)').exec(window.location.search);
    ref = ref && ref.length > 1 ? ref[1] : null

    if (ref === null || ref === undefined) {
      ref = localStorage.getItem(REF_KEY)

      if (!ref || ref === null || ref === undefined) {
        ref = ZERO_ADDRESS
      }
    }

    if (ref && ref === account) {
      if (localStorage.getItem(REF_KEY)) localStorage.removeItem(REF_KEY)
      return alert('Cannot refer yourself')
    }

    const tx = await lotteryContract.deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed(), ref)
    if (ref !== ZERO_ADDRESS) localStorage.setItem(REF_KEY, ref)
    return tx
      
  } catch (err) {
    return console.error(err)
  }
}

export const claim = async (lotteryContract) => {
  try {
    return lotteryContract.claim()
  } catch (err) {
    return console.error(err)
  }
}

export const compound = async (lotteryContract) => {
  try {
    return lotteryContract.roll()
  } catch (err) {
    return console.error(err)
  }
}

export const getTotalRewards = async (lotteryContract, account) => {
  return lotteryContract.getTotalRewards(account)
}

export const getGlassBalance = async (glassContract, account) => {
  return glassContract.balanceOf(account)
}

export const getGlassBalancePool = async (lotteryContract) => {
  return lotteryContract.getGlassBalancePool()
}

export const getWhaleTax = async (lotteryContract, account) => {
  return lotteryContract.getWhaleTax(account)
}

export const getTotalDeposited = async (lotteryContract, scaled) => {
  return scaled ? lotteryContract.total_deposited_scaled() : lotteryContract.total_deposited()
}

export const getLargestDayDepositor = async (lotteryContract) => {
  return lotteryContract.largestDepositor()
}

export const getTimeToReward = async (lotteryContract) => {
  return lotteryContract.timeToReward()
}

export const getLargestTime = async (lotteryContract) => {
  return lotteryContract.largestTime()
}

export const getLargestTimeIncrement = async (lotteryContract) => {
  return lotteryContract.largestTimeIncrement()
}

export const getLotteryTime = async (lotteryContract) => {
  return lotteryContract.lotteryTime()
}

export const getDayTime = async (lotteryContract) => {
  return lotteryContract.dayTime()
}

export const getLotteryTimeIncrement = async (lotteryContract) => {
  return lotteryContract.lotteryTimeIncrement()
}

export const getDayTimeIncrement = async (lotteryContract) => {
  return lotteryContract.dayTimeIncrement()
}

export const getNumTicketsTotal = async (lotteryContract, account) => {
  return lotteryContract.numTicketsTotal(account)
}

export const getNumTicketsDay = async (lotteryContract, account) => {
  return lotteryContract.numTicketsDay(account)
}

export const getNumDepositTicketsRemaining = async (lotteryContract, account) => {
  return lotteryContract.numDepositTicketsRemaining(account)
}

export const getNumCompoundTicketsRemaining = async (lotteryContract, account) => {
  return lotteryContract.numRollTicketsRemaining(account)
}

export const getContractInfoTotals = async (lotteryContract) => {
  return lotteryContract.contractInfo()
}

export const getUserInfoTotals = async (lotteryContract, account) => {
  return lotteryContract.userInfoTotals(account)
}

export const getUserInfo = async (lotteryContract, account) => {
  return lotteryContract.users(account)
}

export const getDayDripEstimate = async (lotteryContract, account) => {
  return lotteryContract.getDayDripEstimate(account)
}

export const getDistributionRewards = async (lotteryContract, account) => {
  return lotteryContract.getDistributionRewards(account)
}

export const getLotteryMin = async (lotteryContract) => {
  return lotteryContract.ticketPrice()
}

export const getNumRandQualified = async (lotteryContract) => {
  return lotteryContract.ticketId()
}

export const getTotalUsers = async (lotteryContract) => {
  return lotteryContract.total_users()
}

export const getDayDeposits = async (lotteryContract, account) => {
  return lotteryContract.getDayDeposits(account)
}

export const getReferralRewards = async (lotteryContract, account) => {
  return lotteryContract.referralRewards(account)
}

export const getPastRandomWinners = async (lotteryContract, timestamp) => {
  return lotteryContract.listRandomWinners(timestamp)
}

export const getLargestDepositor = async (lotteryContract) => {
  return lotteryContract.largestDepositor()
}

export const getLargestDeposit = async (lotteryContract) => {
  return lotteryContract.largestDeposit()
}

export const getPastLargestDepositor = async (lotteryContract, timestamp) => {
  return lotteryContract.largestWinner(timestamp)
}

export const getPastTicketWinners = async (lotteryContract, timestamp) => {
  return lotteryContract.listLargestTicketWinners(timestamp)
}

