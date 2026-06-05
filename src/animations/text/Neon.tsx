import React, { useEffect } from 'react'
import { TextStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface NeonProps {
  text: string
  color?: string
  glowRadius?: number
  flicker?: boolean
  style?: TextStyle
}

export function Neon({
  text,
  color = '#FF00E5',
  glowRadius = 12,
  flicker = true,
  style,
}: NeonProps) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    if (!flicker) {
      opacity.value = 1
      return
    }
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.35, { duration: 50 }),
        withTiming(1, { duration: 80 }),
        withTiming(0.7, { duration: 60 }),
        withTiming(1, { duration: 100 }),
        withTiming(1, { duration: 2200 })
      ),
      -1,
      false
    )
  }, [flicker])

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.Text
      style={[
        {
          color,
          textShadowColor: color,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: glowRadius,
        },
        style,
        animStyle,
      ]}
    >
      {text}
    </Animated.Text>
  )
}
