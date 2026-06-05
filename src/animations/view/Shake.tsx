import React, { useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface ShakeProps extends ViewProps {
  trigger?: boolean
  amount?: number
  duration?: number
}

export function Shake({
  trigger = false,
  amount = 8,
  duration = 400,
  style,
  children,
  ...props
}: ShakeProps) {
  const tx = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      const step = duration / 6
      tx.value = withSequence(
        withTiming(-amount, { duration: step }),
        withTiming(amount, { duration: step }),
        withTiming(-amount * 0.7, { duration: step }),
        withTiming(amount * 0.5, { duration: step }),
        withTiming(-amount * 0.3, { duration: step }),
        withTiming(0, { duration: step })
      )
    }
    prev.current = trigger
  }, [trigger, amount, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
