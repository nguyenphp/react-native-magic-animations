import React, { useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface RubberBandProps extends ViewProps {
  trigger?: boolean
  duration?: number
}

export function RubberBand({
  trigger = false,
  duration = 1000,
  style,
  children,
  ...props
}: RubberBandProps) {
  const sx = useSharedValue(1)
  const sy = useSharedValue(1)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      const step = duration / 5
      sx.value = withSequence(
        withTiming(1.25, { duration: step }),
        withTiming(0.75, { duration: step }),
        withTiming(1.15, { duration: step }),
        withTiming(0.95, { duration: step }),
        withTiming(1, { duration: step })
      )
      sy.value = withSequence(
        withTiming(0.75, { duration: step }),
        withTiming(1.25, { duration: step }),
        withTiming(0.85, { duration: step }),
        withTiming(1.05, { duration: step }),
        withTiming(1, { duration: step })
      )
    }
    prev.current = trigger
  }, [trigger, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: sx.value }, { scaleY: sy.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
