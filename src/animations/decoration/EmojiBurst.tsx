import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface EmojiBurstProps extends ViewProps {
  trigger?: boolean
  emojis?: string[]
  count?: number
  duration?: number
  onDone?: () => void
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

interface EmojiCfg {
  emoji: string
  angle: number
  distance: number
  size: number
  spin: number
}

function Emoji({
  cfg,
  progress,
}: {
  cfg: EmojiCfg
  progress: SharedValue<number>
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const eased = t * (2 - t)
    return {
      transform: [
        { translateX: Math.cos(cfg.angle) * cfg.distance * eased },
        { translateY: Math.sin(cfg.angle) * cfg.distance * eased - 200 * t * t },
        { rotate: `${cfg.spin * t}deg` },
        { scale: t < 0.15 ? t / 0.15 : 1 - Math.max(0, t - 0.7) / 0.3 },
      ],
      opacity: t < 0.1 ? t / 0.1 : 1 - Math.max(0, t - 0.7) / 0.3,
    }
  })

  return (
    <Animated.View style={[styles.emoji, animStyle]} pointerEvents="none">
      <Text style={{ fontSize: cfg.size }}>{cfg.emoji}</Text>
    </Animated.View>
  )
}

export function EmojiBurst({
  trigger = false,
  emojis = ['🎉', '✨', '💖', '🌟'],
  count = 18,
  duration = 1400,
  onDone,
  style,
  children,
  ...props
}: EmojiBurstProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(false)
  const progress = useSharedValue(0)
  const prev = useRef(false)

  const config = useMemo<EmojiCfg[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = lcg(i * 7 + 1)
        const r2 = lcg(i * 11 + 3)
        const r3 = lcg(i * 13 + 5)
        const r4 = lcg(i * 17 + 7)
        return {
          emoji: emojis[Math.floor(r1 * emojis.length)]!,
          angle: -Math.PI / 2 + (r2 - 0.5) * Math.PI * 1.5,
          distance: 80 + r3 * 160,
          size: 22 + r4 * 18,
          spin: (r1 - 0.5) * 360,
        }
      }),
    [count, emojis]
  )

  useEffect(() => {
    if (trigger && !prev.current) {
      progress.value = 0
      setActive(true)
      progress.value = withTiming(
        1,
        { duration, easing: Easing.out(Easing.cubic) },
        (done) => {
          if (done) runOnJS(handleDone)()
        }
      )
    }
    prev.current = trigger
  }, [trigger, duration])

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
      {active && (
        <View pointerEvents="none" style={styles.layer}>
          <View
            style={{
              position: 'absolute',
              left: box.w / 2,
              top: box.h / 2,
            }}
          >
            {config.map((cfg, i) => (
              <Emoji key={i} cfg={cfg} progress={progress} />
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative' },
  layer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  emoji: { position: 'absolute' },
})
