import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type Origin = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center'

interface MosaicProps extends ViewProps {
  show?: boolean
  cols?: number
  rows?: number
  origin?: Origin
  duration?: number
  perspective?: number
}

function Tile({
  x,
  y,
  w,
  h,
  fullW,
  fullH,
  startT,
  progress,
  perspective,
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  fullW: number
  fullH: number
  startT: number
  progress: SharedValue<number>
  perspective: number
  children: React.ReactNode
}) {
  const animStyle = useAnimatedStyle(() => {
    const t = progress.value
    const local = Math.max(0, Math.min(1, (t - startT) / 0.35))
    return {
      transform: [
        { perspective },
        { rotateY: `${(1 - local) * 90}deg` },
      ],
      opacity: local,
    }
  })

  return (
    <Animated.View
      style={[
        styles.tile,
        { left: x, top: y, width: w, height: h },
        animStyle,
      ]}
    >
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: -x,
          top: -y,
          width: fullW,
          height: fullH,
        }}
      >
        {children}
      </View>
    </Animated.View>
  )
}

function originCoord(origin: Origin, cols: number, rows: number) {
  switch (origin) {
    case 'topLeft':
      return { r: 0, c: 0 }
    case 'topRight':
      return { r: 0, c: cols - 1 }
    case 'bottomLeft':
      return { r: rows - 1, c: 0 }
    case 'bottomRight':
      return { r: rows - 1, c: cols - 1 }
    default:
      return { r: (rows - 1) / 2, c: (cols - 1) / 2 }
  }
}

export function Mosaic({
  show = true,
  cols = 10,
  rows = 6,
  origin = 'topLeft',
  duration = 900,
  perspective = 800,
  style,
  children,
  ...props
}: MosaicProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const progress = useSharedValue(show ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(show ? 1 : 0, {
      duration,
      easing: Easing.linear,
    })
  }, [show, duration])

  const tiles = useMemo(() => {
    if (box.w === 0) return []
    const { r: oR, c: oC } = originCoord(origin, cols, rows)
    const maxDist = Math.max(
      Math.abs(oR) + Math.abs(oC),
      Math.abs(oR - (rows - 1)) + Math.abs(oC - (cols - 1)),
      Math.abs(oR) + Math.abs(oC - (cols - 1)),
      Math.abs(oR - (rows - 1)) + Math.abs(oC)
    )
    const tw = box.w / cols
    const th = box.h / rows
    const arr: Array<{ x: number; y: number; w: number; h: number; startT: number }> = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.abs(r - oR) + Math.abs(c - oC)
        arr.push({
          x: c * tw,
          y: r * th,
          w: tw + 0.5,
          h: th + 0.5,
          startT: (dist / maxDist) * 0.65,
        })
      }
    }
    return arr
  }, [box.w, box.h, cols, rows, origin])

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {tiles.map((t, i) => (
        <Tile
          key={i}
          {...t}
          fullW={box.w}
          fullH={box.h}
          progress={progress}
          perspective={perspective}
        >
          {children}
        </Tile>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  tile: { position: 'absolute', overflow: 'hidden', backfaceVisibility: 'hidden' },
})
