import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface CurtainProps extends ViewProps {
  show?: boolean
  direction?: 'horizontal' | 'vertical'
  color?: string
  duration?: number
}

export function Curtain({
  show = true,
  direction = 'horizontal',
  color = '#1F2937',
  duration = 700,
  style,
  children,
  ...props
}: CurtainProps) {
  const [box, setBox] = useState({ w: 0, h: 0 })
  const progress = useSharedValue(show ? 1 : 0) // 1 = open

  useEffect(() => {
    progress.value = withTiming(show ? 1 : 0, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [show, duration])

  const leftStyle = useAnimatedStyle(() => {
    const cover = (1 - progress.value) * 0.5
    if (direction === 'horizontal') {
      return { width: box.w * cover, height: box.h, left: 0, top: 0 }
    }
    return { width: box.w, height: box.h * cover, left: 0, top: 0 }
  })

  const rightStyle = useAnimatedStyle(() => {
    const cover = (1 - progress.value) * 0.5
    if (direction === 'horizontal') {
      return { width: box.w * cover, height: box.h, right: 0, top: 0 }
    }
    return { width: box.w, height: box.h * cover, left: 0, bottom: 0 }
  })

  function onLayout(e: LayoutChangeEvent) {
    setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[styles.panel, { backgroundColor: color }, leftStyle]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.panel, { backgroundColor: color }, rightStyle]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  panel: { position: 'absolute' },
})
