import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface FadeInProps extends ViewProps {
  duration?: number
  delay?: number
  from?: 'bottom' | 'top' | 'left' | 'right' | 'none'
  offset?: number
}

export function FadeIn({
  duration = 500,
  delay = 0,
  from = 'bottom',
  offset = 20,
  style,
  children,
  ...props
}: FadeInProps) {
  const opacity = useSharedValue(0)
  const translate = useSharedValue(offset)

  useEffect(() => {
    const config = { duration, easing: Easing.out(Easing.cubic) }
    setTimeout(() => {
      opacity.value = withTiming(1, config)
      translate.value = withTiming(0, config)
    }, delay)
  }, [])

  const animStyle = useAnimatedStyle(() => {
    const transform =
      from === 'bottom' ? [{ translateY: translate.value }]
      : from === 'top' ? [{ translateY: -translate.value }]
      : from === 'left' ? [{ translateX: -translate.value }]
      : from === 'right' ? [{ translateX: translate.value }]
      : []

    return { opacity: opacity.value, transform }
  })

  return (
    <Animated.View style={[style, animStyle]} pointerEvents="box-none" {...props}>
      {children}
    </Animated.View>
  )
}
