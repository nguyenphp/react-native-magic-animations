import React, { useEffect } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface BounceInProps {
  text: string
  stagger?: number
  drop?: number
  delay?: number
  style?: TextStyle
}

function Char({
  char,
  index,
  stagger,
  drop,
  delay,
  style,
}: {
  char: string
  index: number
  stagger: number
  drop: number
  delay: number
  style?: TextStyle
}) {
  const ty = useSharedValue(-drop)
  const opacity = useSharedValue(0)

  useEffect(() => {
    const totalDelay = delay + index * stagger
    ty.value = withDelay(totalDelay, withSpring(0, { damping: 8, stiffness: 180 }))
    opacity.value = withDelay(totalDelay, withTiming(1, { duration: 200 }))
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }],
    opacity: opacity.value,
  }))

  return <Animated.Text style={[style, animStyle]}>{char}</Animated.Text>
}

export function BounceIn({
  text,
  stagger = 60,
  drop = 30,
  delay = 0,
  style,
}: BounceInProps) {
  return (
    <View style={styles.row}>
      {Array.from(text).map((char, i) => (
        <Char
          key={`${char}-${i}`}
          char={char === ' ' ? ' ' : char}
          index={i}
          stagger={stagger}
          drop={drop}
          delay={delay}
          style={style}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
})
