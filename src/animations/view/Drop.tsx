import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface DropProps extends ViewProps {
  height?: number
  delay?: number
}

export function Drop({
  height = 40,
  delay = 0,
  style,
  children,
  ...props
}: DropProps) {
  const ty = useSharedValue(-height)
  const opacity = useSharedValue(0)

  useEffect(() => {
    ty.value = withDelay(delay, withSpring(0, { damping: 8, stiffness: 150 }))
    opacity.value = withDelay(delay, withTiming(1, { duration: 200 }))
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
