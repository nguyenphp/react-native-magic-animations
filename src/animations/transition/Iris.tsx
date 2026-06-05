import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface IrisProps extends ViewProps {
  show?: boolean
  origin?: { x: number; y: number }
  duration?: number
}

export function Iris({
  show = true,
  origin = { x: 0.5, y: 0.5 },
  duration = 600,
  style,
  children,
  ...props
}: IrisProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const progress = useSharedValue(show ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(show ? 1 : 0, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [show, duration])

  const ox = origin.x * box.w
  const oy = origin.y * box.h
  const maxDist =
    box.w > 0
      ? Math.max(
          Math.hypot(ox, oy),
          Math.hypot(box.w - ox, oy),
          Math.hypot(ox, box.h - oy),
          Math.hypot(box.w - ox, box.h - oy)
        )
      : 0

  const irisStyle = useAnimatedStyle(() => {
    const r = maxDist * progress.value
    return {
      width: 2 * r,
      height: 2 * r,
      borderRadius: r,
      left: ox - r,
      top: oy - r,
    }
  })

  const innerStyle = useAnimatedStyle(() => {
    const r = maxDist * progress.value
    return {
      left: r - ox,
      top: r - oy,
    }
  })

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {box.w > 0 && (
        <Animated.View style={[styles.iris, irisStyle]}>
          <Animated.View
            style={[
              { position: 'absolute', width: box.w, height: box.h },
              innerStyle,
            ]}
          >
            {children}
          </Animated.View>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', position: 'relative' },
  iris: { position: 'absolute', overflow: 'hidden' },
})
