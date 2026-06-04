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

interface BreatheProps extends ViewProps {
  minScale?: number
  maxScale?: number
  duration?: number
}

export function Breathe({ minScale = 0.97, maxScale = 1.03, duration = 2000, style, children, ...props }: BreatheProps) {
  const scale = useSharedValue(1)

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(maxScale, { duration, easing: Easing.inOut(Easing.sin) }),
        withTiming(minScale, { duration, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} pointerEvents="box-none" {...props}>
      {children}
    </Animated.View>
  )
}
