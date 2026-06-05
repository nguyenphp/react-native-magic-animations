import React, { useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface WobbleProps extends ViewProps {
  trigger?: boolean
  angle?: number
  duration?: number
}

export function Wobble({
  trigger = false,
  angle = 8,
  duration = 600,
  style,
  children,
  ...props
}: WobbleProps) {
  const rotation = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      const step = duration / 5
      rotation.value = withSequence(
        withTiming(-angle, { duration: step }),
        withTiming(angle, { duration: step }),
        withTiming(-angle * 0.6, { duration: step }),
        withTiming(angle * 0.4, { duration: step }),
        withTiming(0, { duration: step })
      )
    }
    prev.current = trigger
  }, [trigger, angle, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
