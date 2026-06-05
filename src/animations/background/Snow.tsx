import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface SnowProps extends ViewProps {
  flakes?: number
  color?: string
  wind?: number
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Flake({
  startX,
  size,
  containerH,
  duration,
  wind,
  delay,
  color,
}: {
  startX: number
  size: number
  containerH: number
  duration: number
  wind: number
  delay: number
  color: string
}) {
  const ty = useSharedValue(-size)
  const tx = useSharedValue(0)
  const rot = useSharedValue(0)

  useEffect(() => {
    ty.value = -size
    ty.value = withDelay(
      delay,
      withRepeat(
        withTiming(containerH + size, { duration, easing: Easing.linear }),
        -1,
        false
      )
    )
    tx.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(wind, { duration: duration / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(-wind, { duration: duration / 2, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      )
    )
    rot.value = withDelay(
      delay,
      withRepeat(
        withTiming(360, { duration, easing: Easing.linear }),
        -1,
        false
      )
    )
  }, [containerH, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${rot.value}deg` },
    ],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.flake, { left: startX, width: size, height: size }, animStyle]}
    >
      <Text style={{ fontSize: size, color, lineHeight: size }}>❄</Text>
    </Animated.View>
  )
}

export function Snow({
  flakes = 60,
  color = '#FFFFFF',
  wind = 25,
  style,
  children,
  ...props
}: SnowProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const items = useMemo(() => {
    if (box.w === 0) return []
    return Array.from({ length: flakes }, (_, i) => ({
      startX: lcg(i * 7 + 1) * box.w,
      size: 8 + lcg(i * 13 + 3) * 14,
      duration: 6000 + lcg(i * 17 + 5) * 8000,
      delay: lcg(i * 23 + 7) * 6000,
      wind: wind * (0.6 + lcg(i * 29 + 11) * 0.8),
    }))
  }, [box.w, box.h, flakes, wind])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {items.map((f, i) => (
        <Flake key={i} {...f} containerH={box.h} color={color} />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  flake: { position: 'absolute', top: 0 },
})
