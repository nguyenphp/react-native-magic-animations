import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

interface WavesProps extends ViewProps {
  colors?: string[]
  height?: number
  speed?: number
}

function buildPath(width: number, amplitude: number, wavelength: number): string {
  const total = width * 2
  const points = Math.max(20, Math.floor(total / 16))
  let d = `M 0 ${amplitude} `
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * total
    const y = amplitude + Math.sin((x / wavelength) * Math.PI * 2) * amplitude * 0.55
    d += `L ${x} ${y} `
  }
  d += `L ${total} ${amplitude * 2 + 60} L 0 ${amplitude * 2 + 60} Z`
  return d
}

function WaveLayer({
  width,
  color,
  amplitude,
  wavelength,
  speed,
  delay,
}: {
  width: number
  color: string
  amplitude: number
  wavelength: number
  speed: number
  delay: number
}) {
  const tx = useSharedValue(0)

  useEffect(() => {
    tx.value = 0
    tx.value = withDelay(
      delay,
      withRepeat(
        withTiming(-width, { duration: speed, easing: Easing.linear }),
        -1,
        false
      )
    )
  }, [width, speed])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }))

  const d = buildPath(width, amplitude, wavelength)

  return (
    <Animated.View style={[styles.layer, animStyle]}>
      <Svg width={width * 2} height={amplitude * 2 + 80}>
        <Path d={d} fill={color} />
      </Svg>
    </Animated.View>
  )
}

export function Waves({
  colors = ['#0EA5E9', '#0284C7', '#0369A1'],
  height = 180,
  speed = 8000,
  style,
  children,
  ...props
}: WavesProps) {
  const [width, setWidth] = useState(0)

  function onLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width)
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {children}
      {width > 0 &&
        colors.map((color, i) => (
          <View
            key={i}
            pointerEvents="none"
            style={[
              styles.waveContainer,
              { height: height - i * 12, opacity: 0.8 - i * 0.15 },
            ]}
          >
            <WaveLayer
              width={width}
              color={color}
              amplitude={height / 5}
              wavelength={width / (2 + i * 0.4)}
              speed={speed + i * 1500}
              delay={i * 250}
            />
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  layer: { position: 'absolute', bottom: 0, left: 0 },
})
