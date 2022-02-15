import getTimePeriods from '../../../utils/getTimePeriods'

// lottery draws UTC: 02:00 (10:00 SGT), 08:00 (16:00 SGT), 14:00 (22:00 SGT), 20:00 (04:00 SGT)
const lotteryDrawHoursUtc = [20]

const getClosestLotteryHour = (currentHour: number) => {
  switch (true) {
    case currentHour < lotteryDrawHoursUtc[0] || currentHour >= lotteryDrawHoursUtc[3]:
      return lotteryDrawHoursUtc[0]
    case currentHour < lotteryDrawHoursUtc[1]:
      return lotteryDrawHoursUtc[1]
    case currentHour < lotteryDrawHoursUtc[2]:
      return lotteryDrawHoursUtc[2]
    case currentHour < lotteryDrawHoursUtc[3]:
      return lotteryDrawHoursUtc[3]
    default:
      return 0
  }
}

const getNextLotteryDrawTime = (currentMillis: string | number) => {
  const date = new Date(currentMillis)
  const currentHour = date.getUTCHours()
  const nextLotteryHour = getClosestLotteryHour(currentHour)
  // next lottery is tomorrow if the next lottery is at 2am UTC...
  // ...and current time is between 02:00am & 23:59pm UTC
  const nextLotteryIsTomorrow = nextLotteryHour === 2 && currentHour >= 2 && currentHour <= 23
  let millisTimeOfNextDraw

  if (nextLotteryIsTomorrow) {
    const tomorrow = new Date(currentMillis)
    const nextDay = tomorrow.getUTCDate() + 1
    tomorrow.setUTCDate(nextDay)
    millisTimeOfNextDraw = tomorrow.setUTCHours(nextLotteryHour, 0, 0, 0)
    
  } else {
    millisTimeOfNextDraw = date.setUTCHours(nextLotteryHour, 0, 0, 0)
  }

  return millisTimeOfNextDraw
}

// @ts-ignore
const getNextTicketSaleTime = (currentMillis: number) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const hoursAndMinutesString = (hours: string, minutes: string, seconds?: string) => `${parseInt(hours)}h, ${parseInt(minutes)}m${seconds ? ` ${parseInt(seconds)}s` : ''}`
const daysHoursMinutesString = (days: string, hours: string, minutes: string, seconds?: string) => `${parseInt(days)}d ${parseInt(hours)}h, ${parseInt(minutes)}m${seconds ? ` ${parseInt(seconds)}s` : ''}`
const monthDaysHoursMinutesString = (month: string, days: string, hours: string, minutes: string, seconds?: string) => `${parseInt(month)}m ${parseInt(days)}d ${parseInt(hours)}h, ${parseInt(minutes)}m${seconds ? ` ${parseInt(seconds)}s` : ''}`

export const getTicketSaleTime = (currentMillis: number): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { hours } = getTimePeriods(msUntilNextTicketSale / 1000)
  return hoursAndMinutesString(hours.toString(), minutes.toString())
}

export const getLotteryDrawTime = (currentMillis: number): string => {
  const nextLotteryDrawTime = getNextLotteryDrawTime(currentMillis)
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  const { minutes } = getTimePeriods(msUntilLotteryDraw / 1000)
  const { hours } = getTimePeriods(msUntilLotteryDraw / 1000)
  return hoursAndMinutesString(hours.toString(), minutes.toString())
}

export const getStep = () => (1 / 24) * 100

export const getLotteryDrawStep = (sUntilReward: number, sBetweenLotteries = 86400) => {
  const percentageRemaining = (sUntilReward / sBetweenLotteries) * 100
  return percentageRemaining
}

export const getLotteryRewardTime = (sUntilReward: number, showSeconds = false): string => {
  const { months } = getTimePeriods(sUntilReward)
  const { days } = getTimePeriods(sUntilReward)
  const { minutes } = getTimePeriods(sUntilReward)
  const { seconds } = getTimePeriods(sUntilReward)
  const { hours } = getTimePeriods(sUntilReward)
  if (months > 0) {
    return monthDaysHoursMinutesString(months.toString(), days.toString(), hours.toString(), minutes.toString(), showSeconds && seconds.toString())
  }
  return days > 0 ? daysHoursMinutesString(days.toString(), hours.toString(), minutes.toString(), showSeconds && seconds.toString()) : hoursAndMinutesString(hours.toString(), minutes.toString(), showSeconds && seconds.toString())
}
