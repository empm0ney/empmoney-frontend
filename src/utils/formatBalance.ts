import {BigNumber} from 'ethers';
import {BigNumber as BigNumberJS} from 'bignumber.js'

export const getDisplayBalance = (
  balance: BigNumber | BigNumberJS,
  decimals = 18,
  fractionDigits = 4,
  isTruncated: boolean = false,
) => {
  if (decimals === 0) {
    fractionDigits = 0;
  }
  const number = getBalance(balance, decimals - fractionDigits);
  const ret = (number / 10 ** fractionDigits).toFixed(fractionDigits);
  if (ret.length > 12 && isTruncated) {
    return ret.slice(0, 12) + '...';
  }
  return ret;
};

export const getFullDisplayBalance = (balance: BigNumber | BigNumberJS, decimals = 18, isTruncated = false) => {
  return getDisplayBalance(balance, decimals, 4, isTruncated);
};

export function getBalance(balance: BigNumber | BigNumberJS, decimals = 18): number {
  if (!balance) return 0;

  return balance instanceof BigNumberJS
    ? new BigNumberJS(balance).div(new BigNumberJS(10).pow(decimals)).toNumber()
    : Number(balance.div(BigNumber.from(10).pow(decimals)));
}

export const formatBalance = (
  num: number,
  formatMillions = false,
  abbreviationFormats = [
    { value: 1e18, symbol: 'Q' },
    { value: 1e15, symbol: 'Q' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    // { value: 1e6, symbol: 'M' },
    // { value: 1e3, symbol: 'K' },
  ],
): string | number => {
  if (num == null || typeof num !== 'number') {
    // null, undefined, non-numeric, return what was provided
    return num
  }
  if (formatMillions) {
    abbreviationFormats.push({ value: 1e6, symbol: 'M' })
  }

  let format
  if (abbreviationFormats != null) {
    // formats were provided, find one that works
    format = abbreviationFormats.find((f) => num >= f.value)
  }

  if (format != null) {
    // apply the format, insert the symbol next to the numeric portion of the formatted string
    const { value, symbol } = format
    const formatted = (num / value).toLocaleString()
    const parts = formatted.match(/([\D]*)([\d.,]+)([\D]*)/)
    return `${parts[1]}${parts[2]}${symbol}${parts[3]}`
  }

  // otherwise, use the number as provided
  return num.toLocaleString(undefined, { maximumFractionDigits: 0 })
}