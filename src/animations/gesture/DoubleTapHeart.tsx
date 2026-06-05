import React, { useEffect, useRef, useState } from 'react'
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface DoubleTapHeartProps extends ViewProps {
  onLike?: () => void
  heartSize?: number
  heartColor?: string
}

function HeartPulse({
  x,
  y,
  size,
  color,
  onDone,
}: {
  x: number
  y: number
  size: number
  color: string
  onDone: () => void
}) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 250, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 100 })
    )
    opacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(1, { duration: 600 }),
      withTiming(0, { duration: 400 }, (done) => {
        if (done) runOnJS(onDone)()
      })
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.heart,
        { left: x - size / 2, top: y - size / 2 },
        animStyle,
      ]}
    >
      <Text style={{ fontSize: size, color }}>♥</Text>
    </Animated.View>
  )
}

export function DoubleTapHeart({
  onLike,
  heartSize = 80,
  heartColor = '#EF4444',
  style,
  children,
  ...props
}: DoubleTapHeartProps) {
  const lastTap = useRef(0)
  const [hearts, setHearts] = useState<Array<{ x: number; y: number; key: number }>>([])

  function onPress(e: GestureResponderEvent) {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      const { locationX, locationY } = e.nativeEvent
      setHearts((h) => [...h, { x: locationX, y: locationY, key: now }])
      onLike?.()
      lastTap.current = 0
    } else {
      lastTap.current = now
    }
  }

  function removeHeart(key: number) {
    setHearts((h) => h.filter((p) => p.key !== key))
  }

  return (
    <Pressable onPress={onPress} style={[styles.container, style as ViewStyle]} {...props}>
      {children}
      {hearts.map((h) => (
        <HeartPulse
          key={h.key}
          x={h.x}
          y={h.y}
          size={heartSize}
          color={heartColor}
          onDone={() => removeHeart(h.key)}
        />
      ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  heart: { position: 'absolute' },
})
