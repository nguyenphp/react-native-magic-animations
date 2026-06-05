import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface ZoomProps extends ViewProps {
  show?: boolean
  duration?: number
}

export function Zoom({
  show = true,
  duration = 400,
  style,
  children,
  ...props
}: ZoomProps) {
  const scale = useSharedValue(show ? 1 : 0)
  const opacity = useSharedValue(show ? 1 : 0)

  useEffect(() => {
    if (show) {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 })
      opacity.value = withTiming(1, { duration: duration * 0.5 })
    } else {
      scale.value = withTiming(0, { duration, easing: Easing.in(Easing.cubic) })
      opacity.value = withTiming(0, { duration, easing: Easing.in(Easing.cubic) })
    }
  }, [show, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
