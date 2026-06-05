import React, { useEffect } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface AnimatedBarProps {
  value?: number
  height?: number
  color?: string
  trackColor?: string
  duration?: number
  radius?: number
  style?: ViewStyle
}

export function AnimatedBar({
  value = 0,
  height = 12,
  color = '#10B981',
  trackColor = '#E5E7EB',
  duration = 800,
  radius = 99,
  style,
}: AnimatedBarProps) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(Math.max(0, Math.min(1, value)), {
      duration,
      easing: Easing.out(Easing.cubic),
    })
  }, [value, duration])

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }))

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor, borderRadius: radius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          { height, backgroundColor: color, borderRadius: radius },
          fillStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
  fill: { position: 'absolute', left: 0, top: 0 },
})
