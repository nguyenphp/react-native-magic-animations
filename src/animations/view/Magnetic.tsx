import React, { useRef } from 'react'
import { PanResponder, View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface MagneticProps extends ViewProps {
  strength?: number
}

export function Magnetic({
  strength = 0.4,
  children,
  style,
  ...props
}: MagneticProps) {
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        tx.value = withSpring(g.dx * strength, { damping: 15, stiffness: 320 })
        ty.value = withSpring(g.dy * strength, { damping: 15, stiffness: 320 })
      },
      onPanResponderRelease: () => {
        tx.value = withSpring(0, { damping: 12, stiffness: 220 })
        ty.value = withSpring(0, { damping: 12, stiffness: 220 })
      },
      onPanResponderTerminate: () => {
        tx.value = withSpring(0)
        ty.value = withSpring(0)
      },
    })
  ).current

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }))

  return (
    <View {...pan.panHandlers} {...props}>
      <Animated.View style={[style as any, animStyle]}>{children as any}</Animated.View>
    </View>
  )
}
