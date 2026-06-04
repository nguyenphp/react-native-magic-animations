import React, { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

const PIXEL_SIZE = 5  // dp — tiny sand-like pixels

interface ThanosSnapProps extends ViewProps {
  trigger?: boolean
  duration?: number
  onDone?: () => void
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

const COLORS = [
  'rgba(245,222,179,0.95)',
  'rgba(244,164,96,0.9)',
  'rgba(210,180,140,0.9)',
  'rgba(255,218,185,0.85)',
  'rgba(240,230,140,0.85)',
  'rgba(188,143,143,0.8)',
  'rgba(255,255,255,0.7)',
  'rgba(218,165,32,0.85)',
]

interface PixelConfig {
  x: number
  y: number
  tx: number
  ty: number
  delay: number
  color: string
}

function buildPixels(w: number, h: number): PixelConfig[] {
  const cols = Math.min(Math.floor(w / PIXEL_SIZE), 60)
  const rows = Math.min(Math.floor(h / PIXEL_SIZE), 30)
  const pixels: PixelConfig[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col
      const r1 = lcg(i * 7 + 1)
      const r2 = lcg(i * 13 + 3)
      const r3 = lcg(i * 17 + 5)
      const r4 = lcg(i * 23 + 7)
      const r5 = lcg(i * 31 + 11)

      // Scatter direction: biased outward + upward (like dust blowing)
      const angle = -Math.PI * 0.8 + r1 * Math.PI * 1.6  // mostly upward fan
      const dist = 40 + r2 * 140
      const gravity = 30 + r3 * 60  // some fall down too

      pixels.push({
        x: col * PIXEL_SIZE,
        y: row * PIXEL_SIZE,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - gravity,
        delay: r4 * 350,
        color: COLORS[Math.floor(r5 * COLORS.length)]!,
      })
    }
  }

  return pixels
}

const Pixel = React.memo(function Pixel({
  cfg,
  duration,
  isLast,
  onDone,
}: {
  cfg: PixelConfig
  duration: number
  isLast: boolean
  onDone?: () => void
}) {
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  useEffect(() => {
    const ease = Easing.out(Easing.quad)
    tx.value = withDelay(cfg.delay, withTiming(cfg.tx, { duration: duration * 0.7, easing: ease }))
    ty.value = withDelay(cfg.delay, withTiming(cfg.ty, { duration: duration * 0.7, easing: ease }))
    scale.value = withDelay(cfg.delay + duration * 0.1, withTiming(0, { duration: duration * 0.55 }))
    opacity.value = withDelay(
      cfg.delay + duration * 0.25,
      withTiming(0, { duration: duration * 0.45 }, (finished) => {
        if (finished && isLast && onDone) runOnJS(onDone)()
      })
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        styles.pixel,
        { left: cfg.x, top: cfg.y, backgroundColor: cfg.color },
        animStyle,
      ]}
    />
  )
})

export function ThanosSnap({
  trigger = false,
  duration = 1400,
  onDone,
  style,
  children,
  ...props
}: ThanosSnapProps) {
  const [pixels, setPixels] = useState<PixelConfig[]>([])
  const [snapped, setSnapped] = useState(false)
  const contentOpacity = useSharedValue(1)
  const prevTrigger = useRef(false)

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout
    if (width > 0) setPixels(buildPixels(width, height))
  }

  useEffect(() => {
    if (trigger && !prevTrigger.current && pixels.length > 0) {
      contentOpacity.value = withTiming(0, { duration: 50 })
      setSnapped(true)
    }
    prevTrigger.current = trigger
  }, [trigger, pixels])

  function handleDone() {
    setSnapped(false)
    contentOpacity.value = withTiming(1, { duration: 350 })
    onDone?.()
  }

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }))

  return (
    <View style={[{ position: 'relative' }, style]} onLayout={onLayout} {...props}>
      <Animated.View style={contentStyle}>{children}</Animated.View>

      {snapped && pixels.length > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {pixels.map((cfg, i) => (
            <Pixel
              key={i}
              cfg={cfg}
              duration={duration}
              isLast={i === pixels.length - 1}
              onDone={i === pixels.length - 1 ? handleDone : undefined}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pixel: {
    position: 'absolute',
    width: PIXEL_SIZE,
    height: PIXEL_SIZE,
    borderRadius: 1,
  },
})
