import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface JellyPressProps extends PressableProps {
  amount?: number
}

export function JellyPress({
  amount = 0.06,
  children,
  style,
  ...props
}: JellyPressProps) {
  const scaleX = useSharedValue(1)
  const scaleY = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }))

  function onPressIn() {
    scaleX.value = withSpring(1 - amount * 1.7, { damping: 15, stiffness: 320 })
    scaleY.value = withSpring(1 + amount, { damping: 15, stiffness: 320 })
  }
  function onPressOut() {
    scaleX.value = withSpring(1, { damping: 6, stiffness: 220 })
    scaleY.value = withSpring(1, { damping: 6, stiffness: 220 })
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...props}>
      <Animated.View style={[style as any, animStyle]}>{children as any}</Animated.View>
    </Pressable>
  )
}
