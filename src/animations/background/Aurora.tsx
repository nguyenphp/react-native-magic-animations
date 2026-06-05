import React, { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface AuroraProps extends ViewProps {
  colors?: string[]
  speed?: number
}

const DEFAULT_COLORS = ['#86EFAC', '#A7F3D0', '#6EE7B7', '#34D399']

export function Aurora({ colors = DEFAULT_COLORS, speed = 3000, style, children, ...props }: AuroraProps) {
  const blobs = colors.map((_, i) => ({
    x: useSharedValue(i % 2 === 0 ? -30 : 60),
    y: useSharedValue(i < 2 ? -20 : 60),
    scale: useSharedValue(1),
  }))

  useEffect(() => {
    blobs.forEach((blob, i) => {
      const delay = i * (speed / colors.length)
      const ease = Easing.inOut(Easing.sin)

      setTimeout(() => {
        blob.x.value = withRepeat(
          withSequence(
            withTiming(blob.x.value + 40, { duration: speed, easing: ease }),
            withTiming(blob.x.value, { duration: speed, easing: ease })
          ),
          -1,
          false
        )
        blob.y.value = withRepeat(
          withSequence(
            withTiming(blob.y.value + 30, { duration: speed * 1.3, easing: ease }),
            withTiming(blob.y.value, { duration: speed * 1.3, easing: ease })
          ),
          -1,
          false
        )
        blob.scale.value = withRepeat(
          withSequence(
            withTiming(1.3, { duration: speed * 0.8, easing: ease }),
            withTiming(0.9, { duration: speed * 0.8, easing: ease })
          ),
          -1,
          false
        )
      }, delay)
    })
  }, [])

  return (
    <View style={[styles.container, style]} {...props}>
      {blobs.map((blob, i) => {
        const animStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: blob.x.value as number },
            { translateY: blob.y.value as number },
            { scale: blob.scale.value },
          ],
        }))
        return (
          <Animated.View
            key={i}
            style={[
              styles.blob,
              { backgroundColor: colors[i] },
              animStyle,
            ]}
          />
        )
      })}
      <View style={styles.overlay} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
