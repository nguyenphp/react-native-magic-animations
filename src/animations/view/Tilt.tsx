import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface TiltProps extends ViewProps {
  angle?: number
  duration?: number
}

export function Tilt({
  angle = 3,
  duration = 2400,
  style,
  children,
  ...props
}: TiltProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    const ease = Easing.inOut(Easing.sin)
    rotation.value = withRepeat(
      withSequence(
        withTiming(angle, { duration: duration / 2, easing: ease }),
        withTiming(-angle, { duration: duration / 2, easing: ease })
      ),
      -1,
      true
    )
  }, [angle, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
