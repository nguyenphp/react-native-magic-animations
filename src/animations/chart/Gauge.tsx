import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface GaugeProps {
  value?: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  duration?: number
  children?: React.ReactNode
}

function arcPath(cx: number, cy: number, r: number, startA: number, endA: number) {
  const x1 = cx + r * Math.cos(startA)
  const y1 = cy + r * Math.sin(startA)
  const x2 = cx + r * Math.cos(endA)
  const y2 = cy + r * Math.sin(endA)
  const largeArc = endA - startA > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

export function Gauge({
  value = 0,
  size = 200,
  strokeWidth = 16,
  color = '#10B981',
  trackColor = '#E5E7EB',
  duration = 1000,
  children,
}: GaugeProps) {
  const progress = useSharedValue(0)
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  // semi-circle from -π (left) to 0 (right)
  const start = Math.PI
  const end = 2 * Math.PI
  const arcLength = Math.PI * r

  const trackD = arcPath(cx, cy, r, start, end)

  useEffect(() => {
    progress.value = withTiming(Math.max(0, Math.min(1, value)), {
      duration,
      easing: Easing.out(Easing.cubic),
    })
  }, [value, duration])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: arcLength * (1 - progress.value),
  }))

  return (
    <View
      style={{
        width: size,
        height: size / 2 + strokeWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
        <Path
          d={trackD}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <AnimatedPath
          d={trackD}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          animatedProps={animatedProps}
        />
      </Svg>
      {children && (
        <View style={{ position: 'absolute', alignItems: 'center', top: size / 4 }}>
          {children}
        </View>
      )}
    </View>
  )
}
