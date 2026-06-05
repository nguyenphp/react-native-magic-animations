import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface BadgeProps {
  value: number | string
  color?: string
  textColor?: string
  size?: number
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Badge({
  value,
  color = '#EF4444',
  textColor = '#FFFFFF',
  size = 22,
  style,
  textStyle,
}: BadgeProps) {
  const scale = useSharedValue(0)
  const [display, setDisplay] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current === value) {
      // Initial mount or no change
      scale.value = withSpring(1, { damping: 8, stiffness: 200 })
    } else {
      // Pop on change
      scale.value = withSequence(
        withTiming(1.25, { duration: 140 }),
        withSpring(1, { damping: 8, stiffness: 220 })
      )
      setDisplay(value)
    }
    prevValue.current = value
  }, [value])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          minWidth: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          paddingHorizontal: size * 0.3,
        },
        style,
        animStyle,
      ]}
    >
      <Text
        style={[
          { color: textColor, fontSize: size * 0.55, fontWeight: '700' },
          textStyle,
        ]}
      >
        {display}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
