import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface HeartProps extends ViewProps {
  beating?: boolean
  bpm?: number
  intensity?: number
}

export function Heart({
  beating = true,
  bpm = 72,
  intensity = 0.15,
  style,
  children,
  ...props
}: HeartProps) {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (!beating) {
      scale.value = withTiming(1, { duration: 200 })
      return
    }
    const beatMs = 60_000 / bpm
    scale.value = withRepeat(
      withSequence(
        withTiming(1 + intensity, { duration: 140 }),
        withTiming(1, { duration: 140 }),
        withTiming(1 + intensity * 0.7, { duration: 140 }),
        withTiming(1, { duration: Math.max(120, beatMs - 420) })
      ),
      -1,
      false
    )
  }, [beating, bpm, intensity])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
