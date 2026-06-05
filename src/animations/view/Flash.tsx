import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface FlashProps extends ViewProps {
  trigger?: boolean
  color?: string
  duration?: number
}

export function Flash({
  trigger = false,
  color = '#FFFFFF',
  duration = 300,
  style,
  children,
  ...props
}: FlashProps) {
  const opacity = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      opacity.value = withSequence(
        withTiming(1, { duration: duration * 0.15 }),
        withTiming(0, { duration: duration * 0.85 })
      )
    }
    prev.current = trigger
  }, [trigger, duration])

  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <View style={[styles.wrapper, style]} {...props}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: color },
          overlayStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
})
