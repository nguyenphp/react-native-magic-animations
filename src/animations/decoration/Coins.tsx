import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface CoinsProps extends ViewProps {
  trigger?: boolean
  count?: number
  duration?: number
  emoji?: string
  size?: number
  onDone?: () => void
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

interface CoinCfg {
  startX: number
  size: number
  delay: number
  spin: number
  vy: number
  vx: number
  sway: number
  swayPhase: number
}

function Coin({
  cfg,
  progress,
  emoji,
  height,
}: {
  cfg: CoinCfg
  progress: SharedValue<number>
  emoji: string
  height: number
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const eased = t * t
    const sway = Math.sin(t * 5 + cfg.swayPhase) * cfg.sway
    return {
      transform: [
        { translateX: cfg.vx * t + sway },
        { translateY: cfg.vy * eased * 1.3 },
        { rotate: `${cfg.spin * t}deg` },
      ],
      opacity: Math.max(0, 1 - Math.max(0, t - 0.85) / 0.15),
    }
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.coin, { left: cfg.startX }, animStyle]}
    >
      <Text style={{ fontSize: cfg.size }}>{emoji}</Text>
    </Animated.View>
  )
}

export function Coins({
  trigger = false,
  count = 30,
  duration = 2200,
  emoji = '🪙',
  size = 28,
  onDone,
  style,
  children,
  ...props
}: CoinsProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(false)
  const progress = useSharedValue(0)
  const prev = useRef(false)

  const config = useMemo<CoinCfg[]>(
    () =>
      box.w > 0
        ? Array.from({ length: count }, (_, i) => {
            const r1 = lcg(i * 7 + 1)
            const r2 = lcg(i * 11 + 3)
            const r3 = lcg(i * 13 + 5)
            const r4 = lcg(i * 17 + 7)
            const r5 = lcg(i * 19 + 11)
            return {
              startX: r1 * box.w,
              size: size * (0.8 + r2 * 0.5),
              delay: r3 * 400,
              spin: (r4 - 0.5) * 720,
              vy: 350 + r5 * 200,
              vx: (r1 - 0.5) * 80,
              sway: 15 + r2 * 25,
              swayPhase: r3 * Math.PI * 2,
            }
          })
        : [],
    [box.w, count, size]
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
          <Coin key={i} cfg={cfg} progress={progress} emoji={emoji} height={box.h} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  coin: { position: 'absolute', top: -40 },
})
