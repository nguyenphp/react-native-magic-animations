import React, { useEffect } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface FadeWordProps {
  text: string
  stagger?: number
  duration?: number
  delay?: number
  style?: TextStyle
}

function Word({
  word,
  index,
  stagger,
  duration,
  delay,
  style,
  isLast,
}: {
  word: string
  index: number
  stagger: number
  duration: number
  delay: number
  style?: TextStyle
  isLast: boolean
}) {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      delay + index * stagger,
      withTiming(1, { duration, easing: Easing.out(Easing.quad) })
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.Text style={[style, animStyle]}>
      {word}
      {isLast ? '' : ' '}
    </Animated.Text>
  )
}

export function FadeWord({
  text,
  stagger = 100,
  duration = 400,
  delay = 0,
  style,
}: FadeWordProps) {
  const words = text.split(' ')
  return (
    <View style={styles.row}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          index={i}
          stagger={stagger}
          duration={duration}
          delay={delay}
          style={style}
          isLast={i === words.length - 1}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
})
