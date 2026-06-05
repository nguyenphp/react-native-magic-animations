import React, { useEffect } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface NotificationProps extends ViewProps {
  ringing?: boolean
  amount?: number
  duration?: number
}

export function Notification({
  ringing = false,
  amount = 12,
  duration = 1200,
  style,
  children,
  ...props
}: NotificationProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (ringing) {
      const step = duration / 8
      rotation.value = withRepeat(
        withSequence(
          withTiming(-amount, { duration: step }),
          withTiming(amount, { duration: step }),
          withTiming(-amount * 0.8, { duration: step }),
          withTiming(amount * 0.6, { duration: step }),
          withTiming(-amount * 0.4, { duration: step }),
          withTiming(0, { duration: step }),
          withTiming(0, { duration: step * 2 })
        ),
        -1,
        false
      )
    } else {
      rotation.value = withTiming(0, { duration: 200 })
    }
  }, [ringing, amount, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
