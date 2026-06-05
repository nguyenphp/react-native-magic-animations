import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface SpinProps extends ViewProps {
  duration?: number
  direction?: 'cw' | 'ccw'
}

export function Spin({
  duration = 2000,
  direction = 'cw',
  style,
  children,
  ...props
}: SpinProps) {
  const rotation = useSharedValue(0)
  const target = direction === 'cw' ? 360 : -360

  useEffect(() => {
    rotation.value = 0
    rotation.value = withRepeat(
      withTiming(target, { duration, easing: Easing.linear }),
      -1,
      false
    )
  }, [duration, direction])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
