import React, { useEffect } from 'react'
import { TextProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface BlinkProps extends Omit<TextProps, 'children'> {
  interval?: number
  children: React.ReactNode
}

export function Blink({ interval = 530, children, style, ...props }: BlinkProps) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: interval }), -1, true)
  }, [interval])

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.Text style={[style, animStyle]} {...props}>
      {children}
    </Animated.Text>
  )
}
