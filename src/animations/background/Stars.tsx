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

interface StarsProps extends ViewProps {
  density?: number
  color?: string
  twinkle?: boolean
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Star({
  x,
  y,
  size,
  color,
  delay,
  twinkle,
  cycle,
}: {
  x: number
  y: number
  size: number
  color: string
  delay: number
  twinkle: boolean
  cycle: number
}) {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    if (!twinkle) {
      opacity.value = 1
      return
    }
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: cycle, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.25, { duration: cycle, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      )
    )
  }, [twinkle, cycle, delay])

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.star,
        {
          left: x,
          top: y,
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

export function Stars({
  density = 80,
  color = '#FFFFFF',
  twinkle = true,
  style,
  children,
  ...props
}: StarsProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const stars = useMemo(() => {
    if (box.w === 0) return []
    return Array.from({ length: density }, (_, i) => ({
      x: lcg(i * 7 + 1) * box.w,
      y: lcg(i * 13 + 3) * box.h,
      size: 1 + lcg(i * 17 + 5) * 3,
      delay: lcg(i * 23 + 7) * 2000,
      cycle: 800 + lcg(i * 29 + 11) * 1400,
    }))
  }, [box.w, box.h, density])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {stars.map((s, i) => (
        <Star key={i} {...s} color={color} twinkle={twinkle} />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  star: { position: 'absolute' },
})
