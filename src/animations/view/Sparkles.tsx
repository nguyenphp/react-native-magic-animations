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
import Svg, { Path } from 'react-native-svg'

interface SparklesProps extends ViewProps {
  colors?: string[]
  count?: number
  size?: number
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
}: {
  x: number
  y: number
  size: number
  color: string
  delay: number
}) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)
  const rotation = useSharedValue(0)

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      )
    )
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0, { duration: 800 })
        ),
        -1,
        false
      )
    )
    rotation.value = withDelay(
      delay,
      withRepeat(
        withTiming(360, { duration: 2400, easing: Easing.linear }),
        -1,
        false
      )
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.star,
        { left: x - size / 2, top: y - size / 2, width: size, height: size },
        animStyle,
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M12 0 L13.5 9.5 L24 12 L13.5 14.5 L12 24 L10.5 14.5 L0 12 L10.5 9.5 Z"
          fill={color}
        />
      </Svg>
    </Animated.View>
  )
}

export function Sparkles({
  colors = ['#FDE68A', '#F472B6', '#A78BFA', '#60A5FA'],
  count = 14,
  size = 14,
  style,
  children,
  ...props
}: SparklesProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const stars = useMemo(() => {
    if (box.w === 0) return []
    const pad = 12
    return Array.from({ length: count }, (_, i) => ({
      x: -pad + lcg(i * 13 + 1) * (box.w + pad * 2),
      y: -pad + lcg(i * 17 + 3) * (box.h + pad * 2),
      size: size * 0.6 + lcg(i * 19 + 5) * size * 0.9,
      color: colors[Math.floor(lcg(i * 23 + 7) * colors.length)]!,
      delay: lcg(i * 29 + 11) * 2000,
    }))
  }, [box.w, box.h, count, size])

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={(e: LayoutChangeEvent) =>
        setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
      {...props}
    >
      {children}
      {stars.map((s, i) => (
        <Star key={i} {...s} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  star: { position: 'absolute' },
})
