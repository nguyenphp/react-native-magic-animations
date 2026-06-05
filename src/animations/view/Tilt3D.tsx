import React, { useRef, useState } from 'react'
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface Tilt3DProps extends ViewProps {
  maxTilt?: number
  perspective?: number
  glare?: boolean
}

export function Tilt3D({
  maxTilt = 15,
  perspective = 1000,
  glare = false,
  style,
  children,
  ...props
}: Tilt3DProps) {
  const rotX = useSharedValue(0)
  const rotY = useSharedValue(0)
  const glareX = useSharedValue(0.5)
  const glareY = useSharedValue(0.5)
  const [size, setSize] = useState({ w: 0, h: 0 })

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent
        if (size.w > 0) {
          const xRatio = locationX / size.w - 0.5
          const yRatio = locationY / size.h - 0.5
          rotY.value = withSpring(xRatio * maxTilt * 2, { damping: 12, stiffness: 220 })
          rotX.value = withSpring(-yRatio * maxTilt * 2, { damping: 12, stiffness: 220 })
          glareX.value = withSpring(locationX / size.w)
          glareY.value = withSpring(locationY / size.h)
        }
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent
        if (size.w > 0) {
          const xRatio = locationX / size.w - 0.5
          const yRatio = locationY / size.h - 0.5
          rotY.value = xRatio * maxTilt * 2
          rotX.value = -yRatio * maxTilt * 2
          glareX.value = locationX / size.w
          glareY.value = locationY / size.h
        }
      },
      onPanResponderRelease: () => {
        rotX.value = withSpring(0, { damping: 12, stiffness: 180 })
        rotY.value = withSpring(0, { damping: 12, stiffness: 180 })
        glareX.value = withSpring(0.5)
        glareY.value = withSpring(0.5)
      },
    })
  ).current

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective },
      { rotateX: `${rotX.value}deg` },
      { rotateY: `${rotY.value}deg` },
    ],
  }))

  const glareStyle = useAnimatedStyle(() => ({
    opacity: glare ? 0.35 : 0,
    transform: [
      { translateX: (glareX.value - 0.5) * size.w * 0.6 },
      { translateY: (glareY.value - 0.5) * size.h * 0.6 },
    ],
  }))

  return (
    <View
      {...pan.panHandlers}
      onLayout={(e: LayoutChangeEvent) =>
        setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
      {...props}
    >
      <Animated.View style={[style, animStyle]}>
        {children}
        {glare && (
          <Animated.View pointerEvents="none" style={[styles.glare, glareStyle]} />
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  glare: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 16,
  },
})
