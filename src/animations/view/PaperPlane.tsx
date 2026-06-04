import React, { useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

interface PaperPlaneProps extends ViewProps {
  trigger?: boolean
  duration?: number
  onDone?: () => void
}

export function PaperPlane({
  trigger = false,
  duration = 1200,
  onDone,
  style,
  children,
  ...props
}: PaperPlaneProps) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotate = useSharedValue(0)
  const scaleX = useSharedValue(1)
  const opacity = useSharedValue(1)
  const prevTrigger = useRef(false)

  useEffect(() => {
    if (trigger && !prevTrigger.current) {
      const easeIn = Easing.in(Easing.cubic)
      const half = duration / 2

      // fold: squish horizontally like crumpling into plane shape
      scaleX.value = withSequence(
        withTiming(0.6, { duration: half * 0.4, easing: Easing.out(Easing.cubic) }),
        withTiming(0.6, { duration: half * 0.2 }),
        withTiming(0, { duration: half * 0.4, easing: easeIn })
      )

      // arc trajectory: up then curve right
      translateY.value = withSequence(
        withTiming(-40, { duration: half, easing: Easing.out(Easing.cubic) }),
        withTiming(-120, { duration: half, easing: easeIn })
      )

      translateX.value = withDelay(
        half * 0.3,
        withTiming(300, { duration: duration * 0.7, easing: Easing.in(Easing.quad) })
      )

      rotate.value = withSequence(
        withTiming(-20, { duration: half * 0.5, easing: Easing.out(Easing.cubic) }),
        withTiming(30, { duration: duration * 0.5, easing: Easing.in(Easing.cubic) })
      )

      opacity.value = withDelay(
        duration * 0.6,
        withTiming(0, { duration: duration * 0.4 }, (finished) => {
          if (finished && onDone) runOnJS(onDone)()
        })
      )
    }
    prevTrigger.current = trigger
  }, [trigger])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scaleX: scaleX.value },
    ],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[style, animStyle]} {...props}>
      {children}
    </Animated.View>
  )
}
