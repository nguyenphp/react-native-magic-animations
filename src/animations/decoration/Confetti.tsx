import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface ConfettiProps extends ViewProps {
  trigger?: boolean
  pieces?: number
  colors?: string[]
  duration?: number
  onDone?: () => void
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

interface PieceConfig {
  startX: number
  size: number
  color: string
  vx: number
  vy: number
  delay: number
  rotateSpeed: number
  sway: number
  swayPhase: number
}

function buildPieces(
  width: number,
  count: number,
  colors: string[]
): PieceConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const r1 = lcg(i * 7 + 1)
    const r2 = lcg(i * 11 + 3)
    const r3 = lcg(i * 13 + 5)
    const r4 = lcg(i * 17 + 7)
    const r5 = lcg(i * 19 + 11)
    const r6 = lcg(i * 23 + 13)
    const r7 = lcg(i * 29 + 17)
    return {
      startX: r1 * width,
      size: 6 + r2 * 8,
      color: colors[Math.floor(r3 * colors.length)]!,
      vx: (r4 - 0.5) * 200,
      vy: 300 + r5 * 200,
      delay: r6 * 250,
      rotateSpeed: (r7 - 0.5) * 720,
      sway: 20 + r1 * 40,
      swayPhase: r2 * Math.PI * 2,
    }
  })
}

function Piece({
  cfg,
  progress,
  height,
}: {
  cfg: PieceConfig
  progress: SharedValue<number>
  height: number
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const eased = t * t
    const sway = Math.sin(t * 6 + cfg.swayPhase) * cfg.sway
    return {
      transform: [
        { translateX: cfg.vx * eased + sway },
        { translateY: cfg.vy * eased * 1.5 },
        { rotate: `${cfg.rotateSpeed * t}deg` },
      ],
      opacity: Math.max(0, 1 - Math.max(0, t - 0.8) / 0.2),
    }
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.piece,
        {
          left: cfg.startX,
          width: cfg.size,
          height: cfg.size * 0.6,
          backgroundColor: cfg.color,
        },
        animStyle,
      ]}
    />
  )
}

export function Confetti({
  trigger = false,
  pieces = 100,
  colors = ['#FDE68A', '#86EFAC', '#F472B6', '#A78BFA', '#60A5FA'],
  duration = 2500,
  onDone,
  style,
  children,
  ...props
}: ConfettiProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(false)
  const progress = useSharedValue(0)
  const prev = useRef(false)

  const config = useMemo(
    () => (box.w > 0 ? buildPieces(box.w, pieces, colors) : []),
    [box.w, pieces, colors]
  )

  useEffect(() => {
    if (trigger && !prev.current && config.length > 0) {
      progress.value = 0
      setActive(true)
      progress.value = withTiming(
        1,
        { duration, easing: Easing.linear },
        (done) => {
          if (done) runOnJS(handleDone)()
        }
      )
    }
    prev.current = trigger
  }, [trigger, config, duration])

  function handleDone() {
    setActive(false)
    onDone?.()
  }

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {children}
      {active &&
        config.map((cfg, i) => (
          <Piece key={i} cfg={cfg} progress={progress} height={box.h} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  piece: { position: 'absolute', top: -20, borderRadius: 2 },
})
