import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface GradientShiftProps extends ViewProps {
  colors?: string[]
  speed?: number
}

export function GradientShift({
  colors = ['#FBCFE8', '#C7D2FE', '#A7F3D0', '#FBCFE8'],
  speed = 4000,
  style,
  children,
  ...props
}: GradientShiftProps) {
  const progress = useSharedValue(0)

  useEffect(() => {
    const stops = colors.length - 1
    progress.value = 0
    progress.value = withRepeat(
      withTiming(stops, {
        duration: speed * stops,
        easing: Easing.linear,
      }),
      -1,
      false
    )
  }, [speed, colors.length])

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      colors.map((_, i) => i),
      colors
    ),
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
