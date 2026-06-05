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

interface GlowProps extends ViewProps {
  color?: string
  intensity?: number
  duration?: number
}

export function Glow({
  color = '#60A5FA',
  intensity = 1,
  duration = 2000,
  style,
  children,
  ...props
}: GlowProps) {
  const radius = useSharedValue(8 * intensity)

  useEffect(() => {
    const ease = Easing.inOut(Easing.sin)
    radius.value = withRepeat(
      withSequence(
        withTiming(24 * intensity, { duration: duration / 2, easing: ease }),
        withTiming(8 * intensity, { duration: duration / 2, easing: ease })
      ),
      -1,
      false
    )
  }, [intensity, duration])

  const animStyle = useAnimatedStyle(() => ({
    shadowOpacity: 0.9,
    shadowRadius: radius.value,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    elevation: 14,
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
