import React, { useEffect, useState } from 'react'
import { Text, TextProps } from 'react-native'
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface CounterProps extends Omit<TextProps, 'children'> {
  from?: number
  to: number
  duration?: number
  decimals?: number
  format?: (n: number) => string
}

export function Counter({
  from = 0,
  to,
  duration = 1500,
  decimals = 0,
  format,
  style,
  ...props
}: CounterProps) {
  const value = useSharedValue(from)
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    value.value = from
    value.value = withTiming(to, {
      duration,
      easing: Easing.out(Easing.cubic),
    })
  }, [to])

  useAnimatedReaction(
    () => {
      const factor = Math.pow(10, decimals)
      return Math.round(value.value * factor) / factor
    },
    (curr, prev) => {
      if (curr !== prev && curr !== null) {
        runOnJS(setDisplay)(curr)
      }
    }
  )

  const text = format ? format(display) : display.toFixed(decimals)

  return (
    <Text style={style} {...props}>
      {text}
    </Text>
  )
}
