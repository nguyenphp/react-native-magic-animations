import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface CrossFadeProps extends ViewProps {
  show?: boolean
  duration?: number
}

export function CrossFade({
  show = true,
  duration = 400,
  style,
  children,
  ...props
}: CrossFadeProps) {
  const opacity = useSharedValue(show ? 1 : 0)

  useEffect(() => {
    opacity.value = withTiming(show ? 1 : 0, { duration })
  }, [show, duration])

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
