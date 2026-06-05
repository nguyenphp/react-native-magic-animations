import React, { useEffect } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface GlitchProps {
  text: string
  intensity?: number
  speed?: number
  style?: TextStyle
}

export function Glitch({
  text,
  intensity = 1,
  speed = 80,
  style,
}: GlitchProps) {
  const rOffset = useSharedValue(0)
  const bOffset = useSharedValue(0)

  useEffect(() => {
    const k = intensity * 3
    rOffset.value = withRepeat(
      withSequence(
        withTiming(k, { duration: speed }),
        withTiming(-k * 0.6, { duration: speed }),
        withTiming(k * 0.5, { duration: speed }),
        withTiming(0, { duration: speed }),
        withTiming(0, { duration: speed * 10 })
      ),
      -1,
      false
    )
    bOffset.value = withRepeat(
      withSequence(
        withTiming(-k, { duration: speed }),
        withTiming(k * 0.6, { duration: speed }),
        withTiming(-k * 0.5, { duration: speed }),
        withTiming(0, { duration: speed }),
        withTiming(0, { duration: speed * 10 })
      ),
      -1,
      false
    )
  }, [intensity, speed])

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rOffset.value }],
  }))
  const bStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bOffset.value }],
  }))

  return (
    <View style={styles.wrapper}>
      <Animated.Text
        style={[style, styles.layer, { color: '#FF0050' }, rStyle]}
      >
        {text}
      </Animated.Text>
      <Animated.Text
        style={[style, styles.layer, { color: '#00E5FF' }, bStyle]}
      >
        {text}
      </Animated.Text>
      <Text style={style}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', alignSelf: 'flex-start' },
  layer: { position: 'absolute', top: 0, left: 0, opacity: 0.85 },
})
