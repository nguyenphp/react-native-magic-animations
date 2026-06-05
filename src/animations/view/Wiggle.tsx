import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface WiggleProps extends ViewProps {
  active?: boolean
  angle?: number
  duration?: number
}

export function Wiggle({
  active = true,
  angle = 2.5,
  duration = 250,
  style,
  children,
  ...props
}: WiggleProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (active) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(angle, { duration: duration / 2 }),
          withTiming(-angle, { duration: duration / 2 })
        ),
        -1,
        true
      )
    } else {
      rotation.value = withTiming(0, { duration: 150 })
    }
  }, [active, angle, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
