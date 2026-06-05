import React, { useEffect, useRef } from 'react'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface CrossProps {
  size?: number
  color?: string
  strokeWidth?: number
  trigger?: boolean
  duration?: number
}

const TOTAL = 24

export function Cross({
  size = 32,
  color = '#EF4444',
  strokeWidth = 3,
  trigger = true,
  duration = 500,
}: CrossProps) {
  const p1 = useSharedValue(0)
  const p2 = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      p1.value = 0
      p2.value = 0
      const half = duration / 2
      p1.value = withTiming(1, { duration: half, easing: Easing.out(Easing.cubic) })
      p2.value = withSequence(
        withTiming(0, { duration: half }),
        withTiming(1, { duration: half, easing: Easing.out(Easing.cubic) })
      )
    }
    prev.current = trigger
  }, [trigger, duration])

  const props1 = useAnimatedProps(() => ({
    strokeDashoffset: TOTAL * (1 - p1.value),
  }))
  const props2 = useAnimatedProps(() => ({
    strokeDashoffset: TOTAL * (1 - p2.value),
  }))

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M6 6 L18 18"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={TOTAL}
        animatedProps={props1}
      />
      <AnimatedPath
        d="M18 6 L6 18"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={TOTAL}
        animatedProps={props2}
      />
    </Svg>
  )
}
