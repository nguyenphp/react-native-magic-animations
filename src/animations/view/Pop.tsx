import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

interface PopProps extends ViewProps {
  delay?: number
  damping?: number
  stiffness?: number
}

export function Pop({
  delay = 0,
  damping = 10,
  stiffness = 180,
  style,
  children,
  ...props
}: PopProps) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping, stiffness }))
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
