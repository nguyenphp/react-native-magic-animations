import React, { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface PulseProps extends ViewProps {
  color?: string
  duration?: number
  intensity?: number
  radius?: number
}

export function Pulse({
  color = '#EF4444',
  duration = 1400,
  intensity = 1.8,
  radius = 999,
  style,
  children,
  ...props
}: PulseProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.7)

  useEffect(() => {
    scale.value = 1
    opacity.value = 0.7
    scale.value = withRepeat(
      withTiming(intensity, { duration, easing: Easing.out(Easing.cubic) }),
      -1,
      false
    )
    opacity.value = withRepeat(
      withTiming(0, { duration, easing: Easing.out(Easing.cubic) }),
      -1,
      false
    )
  }, [duration, intensity])

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <Animated.View
        pointerEvents="none"
        style={[
          { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
          { backgroundColor: color, borderRadius: radius },
          ringStyle,
        ]}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', alignSelf: 'flex-start' },
})
