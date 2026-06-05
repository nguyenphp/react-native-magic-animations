import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface PixelateProps extends ViewProps {
  show?: boolean
  pixelSize?: number
  color?: string
  duration?: number
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Tile({
  x,
  y,
  size,
  color,
  startT,
  progress,
}: {
  x: number
  y: number
  size: number
  color: string
  startT: number
  progress: SharedValue<number>
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const local = Math.max(0, Math.min(1, (t - startT) / 0.3))
    return { opacity: local }
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.tile,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  )
}

export function Pixelate({
  show = true,
  pixelSize = 20,
  color = '#FFFFFF',
  duration = 800,
  style,
  children,
  ...props
}: PixelateProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const progress = useSharedValue(show ? 0 : 1)

  useEffect(() => {
    progress.value = withTiming(show ? 0 : 1, {
      duration,
      easing: Easing.linear,
    })
  }, [show, duration])

  const tiles = useMemo(() => {
    if (box.w === 0) return []
    const cols = Math.ceil(box.w / pixelSize)
    const rows = Math.ceil(box.h / pixelSize)
    const tw = box.w / cols
    const th = box.h / rows
    const arr: Array<{ x: number; y: number; size: number; startT: number }> = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c
        arr.push({
          x: c * tw,
          y: r * th,
          size: Math.max(tw, th) + 0.5,
          startT: lcg(i * 7 + 1) * 0.7,
        })
      }
    }
    return arr
  }, [box.w, box.h, pixelSize])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {children}
      {tiles.map((t, i) => (
        <Tile key={i} {...t} color={color} progress={progress} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  tile: { position: 'absolute' },
})
