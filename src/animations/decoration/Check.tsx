import React, { useEffect, useRef } from 'react'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface CheckProps {
  size?: number
  color?: string
  strokeWidth?: number
  trigger?: boolean
  duration?: number
}

const TOTAL_LENGTH = 30

export function Check({
  size = 32,
  color = '#16A34A',
  strokeWidth = 3,
  trigger = true,
  duration = 500,
}: CheckProps) {
  const progress = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      progress.value = 0
      progress.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    }
    prev.current = trigger
  }, [trigger, duration])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: TOTAL_LENGTH * (1 - progress.value),
  }))

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M5 12 L10 17 L19 8"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={TOTAL_LENGTH}
        animatedProps={animatedProps}
      />
    </Svg>
  )
}
