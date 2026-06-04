import React, { useRef, useState } from 'react'
import { LayoutChangeEvent, PanResponder, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

interface TearRevealProps extends ViewProps {
  direction?: 'left' | 'right' | 'top' | 'bottom'
  color?: string
  snapThreshold?: number
  onTorn?: () => void
  onSnap?: () => void
}

// Pre-computed jagged offsets simulating real paper tear
const JAGS = [0,8,3,15,6,20,10,2,17,7,22,4,13,1,18,9,0,14,5,21,11,3,16,8,23,2,12,19,6,10,24,1,15,7,20,4,17,9,3,13,21,5,11,18,2,16,8,22,0,14]

function buildPath(w: number, h: number, dir: string): string {
  const n = JAGS.length
  // Buffer so paper extends off-screen on the non-torn sides
  const B = 50

  if (dir === 'right') {
    // Paper slides RIGHT. Jagged edge = LEFT side of paper.
    // As paper moves right, jagged left edge sweeps content left→right.
    let d = ''
    // Build jagged left edge top→bottom
    d += `M ${JAGS[0]!} 0 `
    for (let i = 1; i < n; i++) {
      d += `L ${JAGS[i]!} ${(i / n) * h} `
    }
    d += `L 0 ${h} `
    // Close rectangle to the right (extends past content)
    d += `L ${w + B} ${h} L ${w + B} 0 Z`
    return d
  }

  if (dir === 'left') {
    // Paper slides LEFT. Jagged edge = RIGHT side of paper.
    let d = `M ${w - JAGS[0]!} 0 `
    for (let i = 1; i < n; i++) {
      d += `L ${w - JAGS[i]!} ${(i / n) * h} `
    }
    d += `L ${w} ${h} `
    d += `L ${-B} ${h} L ${-B} 0 Z`
    return d
  }

  if (dir === 'bottom') {
    // Paper slides DOWN. Jagged edge = TOP side of paper.
    let d = `M 0 ${JAGS[0]!} `
    for (let i = 1; i < n; i++) {
      d += `L ${(i / n) * w} ${JAGS[i]!} `
    }
    d += `L ${w} 0 `
    d += `L ${w} ${h + B} L 0 ${h + B} Z`
    return d
  }

  // top: Paper slides UP. Jagged edge = BOTTOM side of paper.
  let d = `M 0 ${h - JAGS[0]!} `
  for (let i = 1; i < n; i++) {
    d += `L ${(i / n) * w} ${h - JAGS[i]!} `
  }
  d += `L ${w} ${h} `
  d += `L ${w} ${-B} L 0 ${-B} Z`
  return d
}

export function TearReveal({
  direction = 'right',
  color = '#ffffff',
  snapThreshold = 0.38,
  onTorn,
  onSnap,
  style,
  children,
  ...props
}: TearRevealProps) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const translate = useSharedValue(0)
  const tornRef = useRef(false)

  const isH = direction === 'left' || direction === 'right'

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, { dx, dy }) => {
        if (tornRef.current) return
        const delta = isH ? dx : dy
        const sign = (direction === 'right' || direction === 'bottom') ? 1 : -1
        translate.value = Math.max(0, delta * sign)
      },

      onPanResponderRelease: (_, { dx, dy, vx, vy }) => {
        if (tornRef.current) return
        const sizeVal = isH ? size.w : size.h
        const dist = Math.abs(isH ? dx : dy)
        const vel = Math.abs(isH ? vx : vy)

        if (dist > sizeVal * snapThreshold || vel > 0.5) {
          const sign = (direction === 'right' || direction === 'bottom') ? 1 : -1
          translate.value = withTiming(
            (sizeVal + 60) * sign,
            { duration: 260, easing: Easing.out(Easing.cubic) },
            (done) => {
              tornRef.current = false
              translate.value = 0
              if (done && onTorn) runOnJS(onTorn)()
            }
          )
          tornRef.current = true
        } else {
          translate.value = withSpring(0, { damping: 20, stiffness: 220 }, () => {
            if (onSnap) runOnJS(onSnap)()
          })
        }
      },
    })
  ).current

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout
    setSize({ w: width, h: height })
  }

  const animStyle = useAnimatedStyle(() => ({
    transform: isH
      ? [{ translateX: translate.value }]
      : [{ translateY: translate.value }],
  }))

  const path = size.w > 0 ? buildPath(size.w, size.h, direction) : ''

  return (
    <View style={[styles.container, style]} {...pan.panHandlers} {...props}>
      {children}
      {size.w > 0 && (
        <Animated.View
          style={[StyleSheet.absoluteFill, animStyle]}
          pointerEvents="none"
        >
          <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill}>
            <Path d={path} fill={color} />
          </Svg>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'visible' },
})
