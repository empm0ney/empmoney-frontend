import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '../../../components/Text'

interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  prefix?: string
  postfix?: string
  bold?: boolean
  color?: string
  lineHeight?: number
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = '40px', prefix, postfix, bold = true, color = 'white', lineHeight = 1.5 }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text bold={bold} fontSize={fontSize} color={color} style={{lineHeight}}>
      {prefix}
      {countUp}
      {postfix}
    </Text>
  )
}

export default CardValue
