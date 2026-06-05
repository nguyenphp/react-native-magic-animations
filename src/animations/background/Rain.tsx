import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface RainProps extends ViewProps {
  drops?: number
  color?: string
  angle?: number
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Drop({
  startX,
  length,
  containerH,
  duration,
  delay,
  color,
  thickness,
}: {
  startX: number
  length: number
  containerH: number
  duration: number
  delay: number
  color: string
  thickness: number
}) {
  const ty = useSharedValue(-length)

  useEffect(() => {
    ty.value = -length
    ty.value = withDelay(
      delay,
      withRepeat(
        withTiming(containerH + length, { duration, easing: Easing.linear }),
        -1,
        false
      )
    )
  }, [containerH, duration])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.drop,
        {
          left: startX,
          width: thickness,
          height: length,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  )
}

export function Rain({
  drops = 100,
  color = 'rgba(165,190,210,0.5)',
  angle = 15,
  style,
  children,
  ...props
}: RainProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  // Expand the rain layer beyond the container so rotation doesn't cut corners
  const padW = 80
  const padH = 80

  const items = useMemo(() => {
    if (box.w === 0) return []
    return Array.from({ length: drops }, (_, i) => ({
      startX: lcg(i * 7 + 1) * (box.w + padW * 2),
      length: 14 + lcg(i * 11 + 3) * 26,
      duration: 700 + lcg(i * 13 + 5) * 800,
      delay: lcg(i * 17 + 7) * 1200,
      thickness: 1 + lcg(i * 19 + 11) * 1.2,
    }))
  }, [box.w, box.h, drops])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      <View
        pointerEvents="none"
        style={[
          styles.layer,
          {
            top: -padH,
            left: -padW,
            width: box.w + padW * 2,
            height: box.h + padH * 2,
            transform: [{ rotate: `${angle}deg` }],
          },
        ]}
      >
        {items.map((d, i) => (
          <Drop key={i} {...d} containerH={box.h + padH * 2} color={color} />
        ))}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', position: 'relative' },
  layer: { position: 'absolute' },
  drop: { position: 'absolute', top: 0, borderRadius: 1 },
})
