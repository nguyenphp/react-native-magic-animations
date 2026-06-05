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

interface FirefliesProps extends ViewProps {
  count?: number
  color?: string
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Fly({
  startX,
  startY,
  rangeX,
  rangeY,
  size,
  duration,
  pulseDur,
  delay,
  color,
}: {
  startX: number
  startY: number
  rangeX: number
  rangeY: number
  size: number
  duration: number
  pulseDur: number
  delay: number
  color: string
}) {
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    const ease = Easing.inOut(Easing.sin)
    tx.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(rangeX, { duration, easing: ease }),
          withTiming(-rangeX, { duration, easing: ease })
        ),
        -1,
        true
      )
    )
    ty.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(rangeY, { duration: duration * 1.3, easing: ease }),
          withTiming(-rangeY, { duration: duration * 1.3, easing: ease })
        ),
        -1,
        true
      )
    )
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: pulseDur, easing: ease }),
          withTiming(0.1, { duration: pulseDur, easing: ease })
        ),
        -1,
        false
      )
    )
  }, [duration, pulseDur])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.fly,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: 1,
          shadowRadius: size * 1.5,
          shadowOffset: { width: 0, height: 0 },
          elevation: 8,
        },
        animStyle,
      ]}
    />
  )
}

export function Fireflies({
  count = 25,
  color = '#FDE68A',
  style,
  children,
  ...props
}: FirefliesProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const items = useMemo(() => {
    if (box.w === 0) return []
    return Array.from({ length: count }, (_, i) => ({
      startX: lcg(i * 7 + 1) * box.w,
      startY: lcg(i * 11 + 3) * box.h,
      rangeX: 30 + lcg(i * 13 + 5) * 80,
      rangeY: 20 + lcg(i * 17 + 7) * 60,
      size: 3 + lcg(i * 19 + 11) * 4,
      duration: 2500 + lcg(i * 23 + 13) * 3000,
      pulseDur: 800 + lcg(i * 29 + 17) * 1200,
      delay: lcg(i * 31 + 19) * 3000,
    }))
  }, [box.w, box.h, count])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {items.map((f, i) => (
        <Fly key={i} {...f} color={color} />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  fly: { position: 'absolute' },
})
