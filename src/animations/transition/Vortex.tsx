import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface VortexProps extends ViewProps {
  show?: boolean
  rotations?: number
  duration?: number
}

export function Vortex({
  show = true,
  rotations = 2.5,
  duration = 900,
  style,
  children,
  ...props
}: VortexProps) {
  const progress = useSharedValue(show ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(show ? 1 : 0, {
      duration,
      easing: show ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
    })
  }, [show, duration])

  const animStyle = useAnimatedStyle(() => {
    const p = progress.value
    return {
      transform: [
        { scale: p },
        { rotate: `${rotations * 360 * (1 - p)}deg` },
      ],
      opacity: p,
    }
  })

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
