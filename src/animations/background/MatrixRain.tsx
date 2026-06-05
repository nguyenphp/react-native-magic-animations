import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface MatrixRainProps extends ViewProps {
  charset?: string
  color?: string
  headColor?: string
  fontSize?: number
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Column({
  x,
  fontSize,
  containerH,
  chars,
  color,
  headColor,
  duration,
  delay,
}: {
  x: number
  fontSize: number
  containerH: number
  chars: string[]
  color: string
  headColor: string
  duration: number
  delay: number
}) {
  const totalH = chars.length * fontSize
  const ty = useSharedValue(-totalH)

  useEffect(() => {
    ty.value = -totalH
    ty.value = withDelay(
      delay,
      withRepeat(
        withTiming(containerH + totalH, { duration, easing: Easing.linear }),
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
      style={[styles.col, { left: x, width: fontSize }, animStyle]}
    >
      {chars.map((c, i) => {
        const isHead = i === chars.length - 1
        const opacity = isHead ? 1 : Math.max(0.05, (i + 1) / chars.length)
        return (
          <Text
            key={i}
            style={[
              styles.char,
              {
                fontSize,
                lineHeight: fontSize * 1.1,
                color: isHead ? headColor : color,
                opacity,
              },
            ]}
          >
            {c}
          </Text>
        )
      })}
    </Animated.View>
  )
}

export function MatrixRain({
  charset = '01アイウエオカキクケコサシスセソタチツテト',
  color = '#22C55E',
  headColor = '#DCFCE7',
  fontSize = 14,
  style,
  children,
  ...props
}: MatrixRainProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })

  const columns = useMemo(() => {
    if (box.w === 0) return []
    const colCount = Math.floor(box.w / fontSize)
    return Array.from({ length: colCount }, (_, i) => {
      const charsPerCol = 12 + Math.floor(lcg(i * 7 + 1) * 14)
      return {
        x: i * fontSize,
        chars: Array.from({ length: charsPerCol }, (_, j) => {
          const r = lcg(i * 13 + j * 17 + 3)
          return charset[Math.floor(r * charset.length)]!
        }),
        duration: 3000 + lcg(i * 23 + 7) * 4000,
        delay: lcg(i * 29 + 11) * 4000,
      }
    })
  }, [box.w, box.h, fontSize, charset])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {columns.map((c, i) => (
        <Column
          key={i}
          {...c}
          fontSize={fontSize}
          containerH={box.h}
          color={color}
          headColor={headColor}
        />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', backgroundColor: '#000' },
  col: { position: 'absolute', top: 0 },
  char: { textAlign: 'center' },
})
