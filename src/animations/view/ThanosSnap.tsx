import React, { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated'

type Direction = 'left' | 'right' | 'up' | 'down'

interface ThanosSnapProps extends ViewProps {
  trigger?: boolean
  duration?: number
  direction?: Direction
  colors?: string[]
  pixelSize?: number
  onDone?: () => void
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

// Dusty ash palette — feels like disintegration, not sand
const DEFAULT_COLORS = [
  'rgba(180,165,145,1)',
  'rgba(150,135,115,0.95)',
  'rgba(200,185,165,0.95)',
  'rgba(165,150,130,0.9)',
  'rgba(135,120,100,0.85)',
  'rgba(110,95,80,0.8)',
  'rgba(220,205,185,0.85)',
  'rgba(95,80,65,0.8)',
]

interface PixelConfig {
  x: number
  y: number
  size: number
  startT: number
  driftX: number
  driftY: number
  liftY: number
  jitter: number
  spin: number
  color: string
}

const MAX_COLS = 80
const MAX_ROWS = 50
const WIPE_PORTION = 0.5      // share of total duration spent sweeping the wipe edge across
const FLY_DUR = 0.5            // share of total duration each particle spends flying
const EDGE_JITTER = 0.06       // softens the wipe front so it isn't a perfect line

function buildPixels(
  w: number,
  h: number,
  direction: Direction,
  colors: string[],
  minPixel: number
): PixelConfig[] {
  const cols = Math.min(Math.max(1, Math.floor(w / minPixel)), MAX_COLS)
  const rows = Math.min(Math.max(1, Math.floor(h / minPixel)), MAX_ROWS)
  const sizeX = w / cols
  const sizeY = h / rows
  const tile = Math.max(sizeX, sizeY) + 0.5

  const pixels: PixelConfig[] = []
  const isHorizontal = direction === 'left' || direction === 'right'
  const ax = direction === 'right' ? 1 : direction === 'left' ? -1 : 0
  const ay = direction === 'down' ? 1 : direction === 'up' ? -1 : 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col
      const r1 = lcg(i * 7 + 1)
      const r2 = lcg(i * 13 + 3)
      const r3 = lcg(i * 17 + 5)
      const r4 = lcg(i * 23 + 7)
      const r5 = lcg(i * 31 + 11)
      const r6 = lcg(i * 37 + 13)

      // Wipe progresses across pixels by position — particles near the
      // wipe origin disintegrate first, just like the movie effect.
      let wipePos: number
      if (direction === 'right') wipePos = cols > 1 ? col / (cols - 1) : 0
      else if (direction === 'left') wipePos = cols > 1 ? 1 - col / (cols - 1) : 0
      else if (direction === 'down') wipePos = rows > 1 ? row / (rows - 1) : 0
      else wipePos = rows > 1 ? 1 - row / (rows - 1) : 0

      const startT = Math.max(
        0,
        Math.min(WIPE_PORTION, wipePos * WIPE_PORTION + (r1 - 0.5) * EDGE_JITTER)
      )

      const driftAmt = 60 + r2 * 130
      const liftAmt = 50 + r3 * 100

      pixels.push({
        x: col * sizeX,
        y: row * sizeY,
        size: tile,
        startT,
        driftX: ax * driftAmt + (isHorizontal ? (r5 - 0.5) * 30 : (r5 - 0.5) * 40),
        driftY: ay * driftAmt + (isHorizontal ? 0 : (r4 - 0.5) * 20),
        liftY: isHorizontal ? -liftAmt : -liftAmt * 0.4,
        jitter: r4 * Math.PI * 2,
        spin: (r5 - 0.5) * 200,
        color: colors[Math.floor(r6 * colors.length)]!,
      })
    }
  }

  return pixels
}

const Pixel = React.memo(function Pixel({
  cfg,
  progress,
}: {
  cfg: PixelConfig
  progress: SharedValue<number>
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const local = Math.max(0, Math.min(1, (t - cfg.startT) / FLY_DUR))

    // Pixel is invisible until the wipe edge reaches it, then snaps in
    // (covering content) and fades as it drifts away.
    let opacity = 0
    if (t >= cfg.startT) {
      if (local < 0.06) opacity = local / 0.06
      else opacity = Math.max(0, 1 - (local - 0.06) / 0.94)
    }

    const eased = local * (2 - local)
    const wiggleX = Math.sin(local * 7 + cfg.jitter) * 4 * local
    const wiggleY = Math.cos(local * 5 + cfg.jitter) * 3 * local

    return {
      transform: [
        { translateX: cfg.driftX * eased + wiggleX },
        { translateY: cfg.driftY * eased + cfg.liftY * eased + wiggleY },
        { rotate: `${cfg.spin * eased}deg` },
        { scale: Math.max(0, 1 - local * 0.55) },
      ],
      opacity,
    }
  })

  return (
    <Animated.View
      style={[
        styles.pixel,
        {
          left: cfg.x,
          top: cfg.y,
          width: cfg.size,
          height: cfg.size,
          backgroundColor: cfg.color,
        },
        animStyle,
      ]}
    />
  )
})

export function ThanosSnap({
  trigger = false,
  duration = 1800,
  direction = 'right',
  colors = DEFAULT_COLORS,
  pixelSize = 4,
  onDone,
  style,
  children,
  ...props
}: ThanosSnapProps) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [pixels, setPixels] = useState<PixelConfig[]>([])
  const [snapped, setSnapped] = useState(false)
  const progress = useSharedValue(0)
  const prevTrigger = useRef(false)

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout
    if (width > 0 && height > 0 && (width !== size.w || height !== size.h)) {
      setSize({ w: width, h: height })
    }
  }

  useEffect(() => {
    if (size.w > 0 && size.h > 0) {
      setPixels(buildPixels(size.w, size.h, direction, colors, pixelSize))
    }
  }, [size.w, size.h, direction, pixelSize])

  useEffect(() => {
    if (trigger && !prevTrigger.current && pixels.length > 0) {
      progress.value = 0
      setSnapped(true)
      progress.value = withTiming(
        1,
        { duration, easing: Easing.linear },
        (finished) => {
          if (finished) runOnJS(handleDone)()
        }
      )
    }
    prevTrigger.current = trigger
  }, [trigger, pixels, duration])

  function handleDone() {
    setSnapped(false)
    progress.value = 0
    onDone?.()
  }

  const contentStyle = useAnimatedStyle(() => {
    // Content fades through the dust-densest window so the fade is masked
    // by particles covering it from above.
    const opacity = interpolate(
      progress.value,
      [0, 0.1, 0.6, 1],
      [1, 1, 0, 0],
      Extrapolation.CLAMP
    )
    return { opacity }
  })

  return (
    <View style={[{ position: 'relative' }, style]} onLayout={onLayout} {...props}>
      <Animated.View style={contentStyle}>{children}</Animated.View>

      {snapped && pixels.length > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {pixels.map((cfg, i) => (
            <Pixel key={i} cfg={cfg} progress={progress} />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pixel: {
    position: 'absolute',
    borderRadius: 0.5,
  },
})
