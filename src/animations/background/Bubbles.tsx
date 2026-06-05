import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface BubblesProps extends ViewProps {
  count?: number
  colors?: string[]
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Bubble({
  startX,
  size,
  containerH,
  duration,
  delay,
  sway,
  color,
}: {
  startX: number
  size: number
  containerH: number
  duration: number
  delay: number
  sway: number
  color: string
}) {
  const ty = useSharedValue(containerH + size)
  const tx = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    ty.value = containerH + size
    opacity.value = 0
    ty.value = withDelay(
      delay,
      withRepeat(
        withTiming(-size * 2, { duration, easing: Easing.linear }),
        -1,
        false
      )
    )
    tx.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(sway, { duration: duration / 3, easing: Easing.inOut(Easing.sin) }),
          withTiming(-sway, { duration: duration / 3, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: duration / 3, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      )
    )
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 300 }),
          withTiming(0.7, { duration: duration - 600 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        false
      )
    )
  }, [containerH, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bubble,
        {
          left: startX,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  )
}

export function Bubbles({
  count = 30,
  colors = ['rgba(167,243,208,0.6)', 'rgba(186,230,253,0.6)', 'rgba(196,181,253,0.6)'],
  style,
  children,
  ...props
}: BubblesProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const items = useMemo(() => {
    if (box.w === 0) return []
    return Array.from({ length: count }, (_, i) => ({
      startX: lcg(i * 7 + 1) * box.w,
      size: 10 + lcg(i * 11 + 3) * 24,
      duration: 6000 + lcg(i * 13 + 5) * 6000,
      delay: lcg(i * 17 + 7) * 6000,
      sway: 15 + lcg(i * 19 + 11) * 25,
      color: colors[Math.floor(lcg(i * 23 + 13) * colors.length)]!,
    }))
  }, [box.w, box.h, count])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {items.map((b, i) => (
        <Bubble key={i} {...b} containerH={box.h} />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  bubble: { position: 'absolute', top: 0 },
})
