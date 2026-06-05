import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle, Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface LineChartProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  showDots?: boolean
  duration?: number
}

function buildPath(data: number[], width: number, height: number, pad: number) {
  if (data.length < 2) return { d: '', length: 0, points: [] as Array<{ x: number; y: number }> }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = width - pad * 2
  const h = height - pad * 2
  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * w,
    y: pad + (1 - (v - min) / range) * h,
  }))
  let d = `M ${points[0]!.x} ${points[0]!.y} `
  let length = 0
  for (let i = 1; i < points.length; i++) {
    d += `L ${points[i]!.x} ${points[i]!.y} `
    length += Math.hypot(
      points[i]!.x - points[i - 1]!.x,
      points[i]!.y - points[i - 1]!.y
    )
  }
  return { d, length, points }
}

export function LineChart({
  data,
  width = 320,
  height = 180,
  color = '#10B981',
  strokeWidth = 2.5,
  showDots = true,
  duration = 1500,
}: LineChartProps) {
  const progress = useSharedValue(0)
  const { d, length, points } = useMemo(
    () => buildPath(data, width, height, 12),
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
        {showDots &&
          points.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
          ))}
      </Svg>
    </View>
  )
}
