import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface FloatProps extends ViewProps {
  amplitude?: number
  duration?: number
}

export function Float({ amplitude = 8, duration = 1800, style, children, ...props }: FloatProps) {
  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-amplitude, { duration, easing: Easing.inOut(Easing.sin) }),
        withTiming(amplitude, { duration, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} pointerEvents="box-none" {...props}>
      {children}
    </Animated.View>
  )
}
