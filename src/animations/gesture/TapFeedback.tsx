import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface TapFeedbackProps extends PressableProps {
  scale?: number
}

export function TapFeedback({
  scale = 0.95,
  children,
  style,
  ...props
}: TapFeedbackProps) {
  const s = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }))

  return (
    <Pressable
      onPressIn={() => {
        s.value = withTiming(scale, { duration: 90 })
      }}
      onPressOut={() => {
        s.value = withSpring(1, { damping: 9, stiffness: 220 })
      }}
      {...props}
    >
      <Animated.View style={[style as any, animStyle]}>{children as any}</Animated.View>
    </Pressable>
  )
}
