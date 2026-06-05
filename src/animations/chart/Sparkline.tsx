import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  duration?: number
}

function buildPath(data: number[], width: number, height: number, pad = 4): {
  d: string
  length: number
} {
  if (data.length < 2) return { d: '', length: 0 }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = width - pad * 2
  const h = height - pad * 2
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w
    const y = pad + (1 - (v - min) / range) * h
    return { x, y }
  })
  let d = `M ${points[0]!.x} ${points[0]!.y} `
  let length = 0
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!
    const prev = points[i - 1]!
    d += `L ${p.x} ${p.y} `
    length += Math.hypot(p.x - prev.x, p.y - prev.y)
  }
  return { d, length }
}

export function Sparkline({
  data,
  width = 120,
  height = 40,
  color = '#10B981',
  strokeWidth = 2,
  duration = 1000,
}: SparklineProps) {
  const progress = useSharedValue(0)

  const { d, length } = useMemo(
    () => buildPath(data, width, height),
    [data, width, height]
  )

  useEffect(() => {
    progress.value = 0
    progress.value = withTiming(1, { duration, easing: Easing.out(Easing.cubic) })
  }, [d, duration])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length * (1 - progress.value),
  }))

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <AnimatedPath
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  )
}
