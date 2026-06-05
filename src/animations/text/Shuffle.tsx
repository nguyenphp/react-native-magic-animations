import React, { useEffect } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface ShuffleProps {
  text: string
  duration?: number
  stagger?: number
  scatter?: number
  style?: TextStyle
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Char({
  char,
  finalX,
  startDX,
  startDY,
  index,
  stagger,
  duration,
  style,
}: {
  char: string
  finalX: number
  startDX: number
  startDY: number
  index: number
  stagger: number
  duration: number
  style?: TextStyle
}) {
  const tx = useSharedValue(startDX)
  const ty = useSharedValue(startDY)
  const opacity = useSharedValue(0)

  useEffect(() => {
    const d = index * stagger
    opacity.value = withDelay(d, withTiming(1, { duration: 200 }))
    tx.value = withDelay(
      d,
      withTiming(0, { duration, easing: Easing.out(Easing.cubic) })
    )
    ty.value = withDelay(
      d,
      withTiming(0, { duration, easing: Easing.out(Easing.cubic) })
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.Text
      style={[
        style,
        animStyle,
        { position: 'absolute', left: finalX },
      ]}
    >
      {char === ' ' ? ' ' : char}
    </Animated.Text>
  )
}

export function Shuffle({
  text,
  duration = 1200,
  stagger = 40,
  scatter = 80,
  style,
}: ShuffleProps) {
  const fontSize = ((style as any)?.fontSize as number) ?? 16
  const charWidth = fontSize * 0.6
  const chars = Array.from(text)

  return (
    <View
      style={[
        styles.row,
        { height: fontSize * 1.5, width: chars.length * charWidth },
      ]}
    >
      {chars.map((c, i) => (
        <Char
          key={`${c}-${i}`}
          char={c}
          finalX={i * charWidth}
          startDX={(lcg(i * 7 + 1) - 0.5) * scatter * 2}
          startDY={(lcg(i * 13 + 3) - 0.5) * scatter * 2}
          index={i}
          stagger={stagger}
          duration={duration}
          style={style}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { position: 'relative' },
})
