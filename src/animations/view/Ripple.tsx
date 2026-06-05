import React, { useEffect, useState } from 'react'
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface RippleProps extends ViewProps {
  color?: string
  duration?: number
  onPress?: () => void
}

function RippleEffect({
  x,
  y,
  size,
  color,
  duration,
  onDone,
}: {
  x: number
  y: number
  size: number
  color: string
  duration: number
  onDone: () => void
}) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0.55)

  useEffect(() => {
    scale.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    })
    opacity.value = withTiming(
      0,
      { duration, easing: Easing.out(Easing.cubic) },
      (done) => {
        if (done) runOnJS(onDone)()
      }
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ripple,
        {
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  )
}

export function Ripple({
  color = 'rgba(255,255,255,0.45)',
  duration = 700,
  onPress,
  style,
  children,
  ...props
}: RippleProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; key: number }>>([])

  function handlePressIn(e: GestureResponderEvent) {
    const { locationX, locationY } = e.nativeEvent
    setRipples((r) => [...r, { x: locationX, y: locationY, key: Date.now() + Math.random() }])
  }

  function removeRipple(key: number) {
    setRipples((r) => r.filter((rp) => rp.key !== key))
  }

  const maxSize = Math.max(box.w, box.h) * 2.2

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPress={onPress}
      onLayout={(e: LayoutChangeEvent) =>
        setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
      style={[styles.container, style as ViewStyle]}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <RippleEffect
          key={r.key}
          x={r.x}
          y={r.y}
          size={maxSize}
          color={color}
          duration={duration}
          onDone={() => removeRipple(r.key)}
        />
      ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', position: 'relative' },
  ripple: { position: 'absolute' },
})
