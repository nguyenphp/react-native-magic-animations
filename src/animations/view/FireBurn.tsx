import React, { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated'

interface FireBurnProps extends ViewProps {
  intensity?: number
  colors?: string[]
}

const DEFAULT_COLORS = ['#FF4500', '#FF6B00', '#FF8C00', '#FFA500', '#FFD700']

function Flame({
  color,
  index,
  intensity,
}: {
  color: string
  index: number
  intensity: number
}) {
  const translateY = useSharedValue(0)
  const scaleX = useSharedValue(1)
  const scaleY = useSharedValue(1)
  const opacity = useSharedValue(0.7)

  const delay = index * 120
  const dur = 600 + index * 80

  useEffect(() => {
    const ease = Easing.inOut(Easing.sin)

    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-intensity * 18, { duration: dur, easing: ease }),
          withTiming(-intensity * 8, { duration: dur, easing: ease })
        ),
        -1,
        false
      )
    )

    scaleX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7 + index * 0.05, { duration: dur * 0.8, easing: ease }),
          withTiming(1.1 + index * 0.05, { duration: dur * 0.8, easing: ease })
        ),
        -1,
        false
      )
    )

    scaleY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2 + intensity * 0.2, { duration: dur, easing: ease }),
          withTiming(0.9, { duration: dur, easing: ease })
        ),
        -1,
        false
      )
    )

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.9, { duration: dur * 0.7 }),
          withTiming(0.5, { duration: dur * 0.7 })
        ),
        -1,
        false
      )
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scaleX: scaleX.value },
      { scaleY: scaleY.value },
    ],
    opacity: opacity.value,
  }))

  const size = 24 + index * 8
  const left = `${10 + index * (80 / 4)}%`

  return (
    <Animated.View
      style={[
        styles.flame,
        {
          width: size,
          height: size * 1.6,
          borderRadius: size / 2,
          backgroundColor: color,
          left: left as any,
          bottom: -size * 0.3,
        },
        animStyle,
      ]}
    />
  )
}

export function FireBurn({
  intensity = 1,
  colors = DEFAULT_COLORS,
  style,
  children,
  ...props
}: FireBurnProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
      <View style={styles.fireBase} pointerEvents="none">
        {colors.map((color, i) => (
          <Flame key={i} color={color} index={i} intensity={intensity} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  fireBase: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    overflow: 'visible',
  },
  flame: {
    position: 'absolute',
  },
})
