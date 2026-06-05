import React, { useEffect, useMemo, useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface LikeButtonProps {
  liked: boolean
  onToggle?: () => void
  size?: number
  color?: string
  inactiveColor?: string
  particleColors?: string[]
}

function lcg(s: number) {
  return (((s * 1664525 + 1013904223) | 0) >>> 0) / 4294967295
}

function Particle({
  angle,
  distance,
  size,
  color,
  trigger,
  delay,
}: {
  angle: number
  distance: number
  size: number
  color: string
  trigger: number
  delay: number
}) {
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0)

  useEffect(() => {
    tx.value = 0
    ty.value = 0
    opacity.value = 0
    scale.value = 0
    tx.value = withDelay(delay, withTiming(Math.cos(angle) * distance, { duration: 500, easing: Easing.out(Easing.cubic) }))
    ty.value = withDelay(delay, withTiming(Math.sin(angle) * distance, { duration: 500, easing: Easing.out(Easing.cubic) }))
    scale.value = withDelay(delay, withSequence(
      withTiming(1, { duration: 150 }),
      withTiming(0, { duration: 350 })
    ))
    opacity.value = withDelay(delay, withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 400 })
    ))
  }, [trigger])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        animStyle,
      ]}
    />
  )
}

export function LikeButton({
  liked,
  onToggle,
  size = 32,
  color = '#EF4444',
  inactiveColor = '#9CA3AF',
  particleColors = ['#EF4444', '#F472B6', '#FB923C', '#FDE68A'],
}: LikeButtonProps) {
  const scale = useSharedValue(1)
  const trigger = useRef(0)
  const [, setTick] = React.useState(0)

  useEffect(() => {
    if (liked) {
      scale.value = withSequence(
        withTiming(0.85, { duration: 80 }),
        withSpring(1, { damping: 6, stiffness: 220 })
      )
      trigger.current += 1
      setTick((n) => n + 1)
    } else {
      scale.value = withTiming(1, { duration: 200 })
    }
  }, [liked])

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        distance: size * 0.9 + lcg(i * 7 + 1) * size * 0.3,
        size: 4 + lcg(i * 11 + 3) * 4,
        color: particleColors[i % particleColors.length]!,
        delay: lcg(i * 13 + 5) * 60,
      })),
    [size, particleColors]
  )

  return (
    <Pressable onPress={onToggle} style={styles.btn}>
      <View style={{ width: size * 2.5, height: size * 2.5, alignItems: 'center', justifyContent: 'center' }}>
        {liked &&
          particles.map((p, i) => <Particle key={i} {...p} trigger={trigger.current} />)}
        <Animated.View style={heartStyle}>
          <Text style={{ fontSize: size, color: liked ? color : inactiveColor }}>♥</Text>
        </Animated.View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: { alignSelf: 'flex-start' },
  particle: { position: 'absolute' },
})
