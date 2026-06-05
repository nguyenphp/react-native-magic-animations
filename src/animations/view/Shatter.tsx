import React, { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface ShatterProps extends ViewProps {
  trigger?: boolean
  shards?: number
  gravity?: number
  duration?: number
  onDone?: () => void
}

interface ShardConfig {
  x: number
  y: number
  w: number
  h: number
  vx: number
  vy: number
  spin: number
  startT: number
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function buildShards(w: number, h: number, count: number): ShardConfig[] {
  const cols = Math.max(2, Math.ceil(Math.sqrt(count * (w / h))))
  const rows = Math.max(2, Math.ceil(count / cols))
  const sw = w / cols
  const sh = h / rows
  const shards: ShardConfig[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      const r1 = lcg(i * 7 + 1)
      const r2 = lcg(i * 11 + 3)
      const r3 = lcg(i * 13 + 5)
      const r4 = lcg(i * 17 + 7)
      const cx = c * sw + sw / 2
      shards.push({
        x: c * sw,
        y: r * sh,
        w: sw,
        h: sh,
        vx: ((cx - w / 2) / (w / 2)) * 120 + (r1 - 0.5) * 80,
        vy: -80 - r2 * 80,
        spin: (r3 - 0.5) * 360,
        startT: r4 * 0.1,
      })
    }
  }
  return shards
}

function Shard({
  cfg,
  progress,
  gravity,
  children,
}: {
  cfg: ShardConfig
  progress: SharedValue<number>
  gravity: number
  children?: React.ReactNode
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = Math.max(0, progress.value - cfg.startT) / (1 - cfg.startT)
    const eased = t * t // ease-in for accel
    const fallEased = t * t * gravity
    return {
      transform: [
        { translateX: cfg.vx * t },
        { translateY: cfg.vy * t + 280 * fallEased },
        { rotate: `${cfg.spin * t}deg` },
      ],
      opacity: Math.max(0, 1 - Math.max(0, t - 0.4) / 0.6),
    }
  })

  return (
    <Animated.View
      style={[
        styles.shard,
        { left: cfg.x, top: cfg.y, width: cfg.w, height: cfg.h },
        animStyle,
      ]}
      pointerEvents="none"
    >
      <View
        style={{
          position: 'absolute',
          left: -cfg.x,
          top: -cfg.y,
          width: cfg.x + cfg.w,
          height: cfg.y + cfg.h,
        }}
      >
        {children}
      </View>
    </Animated.View>
  )
}

export function Shatter({
  trigger = false,
  shards = 24,
  gravity = 1,
  duration = 1200,
  onDone,
  style,
  children,
  ...props
}: ShatterProps) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [config, setConfig] = useState<ShardConfig[]>([])
  const [broken, setBroken] = useState(false)
  const progress = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (size.w > 0) setConfig(buildShards(size.w, size.h, shards))
  }, [size.w, size.h, shards])

  useEffect(() => {
    if (trigger && !prev.current && config.length > 0) {
      progress.value = 0
      setBroken(true)
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
    setBroken(false)
    progress.value = 0
    onDone?.()
  }

  const contentStyle = useAnimatedStyle(() => ({
    opacity: broken ? 0 : 1,
  }))

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={(e: LayoutChangeEvent) =>
        setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
      {...props}
    >
      <Animated.View style={contentStyle}>{children}</Animated.View>
      {broken &&
        config.map((cfg, i) => (
          <Shard key={i} cfg={cfg} progress={progress} gravity={gravity}>
            {children}
          </Shard>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', overflow: 'hidden' },
  shard: { position: 'absolute', overflow: 'hidden' },
})
