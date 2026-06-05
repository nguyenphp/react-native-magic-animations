import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface RotatorProps {
  words: string[]
  interval?: number
  transitionDuration?: number
  style?: TextStyle
}

export function Rotator({
  words,
  interval = 2000,
  transitionDuration = 400,
  style,
}: RotatorProps) {
  const [index, setIndex] = useState(0)
  const opacity = useSharedValue(1)
  const ty = useSharedValue(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => {
      const half = transitionDuration / 2
      opacity.value = withTiming(0, { duration: half })
      ty.value = withTiming(
        -12,
        { duration: half, easing: Easing.in(Easing.quad) },
        () => {
          runOnJS(setIndex)((i: number) => (i + 1) % words.length)
        }
      )
    }, interval)
    return () => clearInterval(id)
  }, [interval, transitionDuration, words.length])

  useEffect(() => {
    const half = transitionDuration / 2
    ty.value = 12
    opacity.value = 0
    ty.value = withTiming(0, { duration: half, easing: Easing.out(Easing.quad) })
    opacity.value = withTiming(1, { duration: half })
  }, [index])

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: ty.value }],
  }))

  return (
    <View style={styles.wrapper}>
      <Animated.Text style={[style, animStyle]}>{words[index]}</Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { overflow: 'hidden', alignSelf: 'flex-start' },
})
