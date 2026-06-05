import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface LongPressGrowProps extends PressableProps {
  growScale?: number
  duration?: number
}

export function LongPressGrow({
  growScale = 1.1,
  duration = 500,
  children,
  style,
  ...props
}: LongPressGrowProps) {
  const s = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }))

  return (
    <Pressable
      onPressIn={() => {
        s.value = withTiming(growScale, { duration })
      }}
      onPressOut={() => {
        s.value = withSpring(1, { damping: 8, stiffness: 200 })
      }}
      {...props}
    >
      <Animated.View style={[style as any, animStyle]}>{children as any}</Animated.View>
    </Pressable>
  )
}
