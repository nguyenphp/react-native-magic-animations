import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface StampProps extends ViewProps {
  trigger?: boolean
  text?: string
  color?: string
  size?: number
}

export function Stamp({
  trigger = false,
  text = 'PAID',
  color = '#16A34A',
  size = 80,
  style,
  ...props
}: StampProps) {
  const scale = useSharedValue(0)
  const rotation = useSharedValue(-18)
  const opacity = useSharedValue(0)
  const ringScale = useSharedValue(0)
  const ringOpacity = useSharedValue(0)
  const prev = useRef(false)

  useEffect(() => {
    if (trigger && !prev.current) {
      scale.value = 3
      opacity.value = 0
      rotation.value = -18
      ringScale.value = 0
      ringOpacity.value = 0

      opacity.value = withTiming(1, { duration: 100 })
      scale.value = withSequence(
        withTiming(0.9, { duration: 220, easing: Easing.in(Easing.cubic) }),
        withSpring(1, { damping: 6, stiffness: 220 })
      )
      rotation.value = withTiming(0, { duration: 220, easing: Easing.in(Easing.cubic) })

      ringScale.value = withDelay(
        200,
        withTiming(1.6, { duration: 600, easing: Easing.out(Easing.cubic) })
      )
      ringOpacity.value = withDelay(
        200,
        withSequence(
          withTiming(0.7, { duration: 60 }),
          withTiming(0, { duration: 540 })
        )
      )
    }
    prev.current = trigger
  }, [trigger])

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }))

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }))

  const padding = size / 6

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size,
            borderColor: color,
            borderWidth: 2,
            left: -size * 0.2,
            top: -size * 0.2,
          },
          ringStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.badge,
          {
            width: size,
            height: size * 0.6,
            borderRadius: 8,
            borderColor: color,
            borderWidth: 3,
            padding,
          },
          badgeStyle,
        ]}
      >
        <Text
          style={{
            color,
            fontWeight: '900',
            fontSize: size * 0.25,
            letterSpacing: 1.2,
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', alignSelf: 'flex-start' },
  ring: { position: 'absolute' },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
})
