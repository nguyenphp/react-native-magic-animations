import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface CapitalizeProps {
  text: string
  stagger?: number
  delay?: number
  style?: TextStyle
}

function Char({
  char,
  capChar,
  index,
  stagger,
  delay,
  style,
}: {
  char: string
  capChar: string
  index: number
  stagger: number
  delay: number
  style?: TextStyle
}) {
  const ty = useSharedValue(0)
  const scale = useSharedValue(1)
  const [isCap, setIsCap] = useState(false)

  useEffect(() => {
    const total = delay + index * stagger
    const id = setTimeout(() => setIsCap(true), total)
    ty.value = withDelay(
      total,
      withSequence(
        withTiming(-14, { duration: 180 }),
        withSpring(0, { damping: 7, stiffness: 200 })
      )
    )
    scale.value = withDelay(
      total,
      withSequence(
        withTiming(1.25, { duration: 180 }),
        withSpring(1, { damping: 9, stiffness: 220 })
      )
    )
    return () => clearTimeout(id)
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }, { scale: scale.value }],
  }))

  return (
    <Animated.Text style={[style, animStyle]}>
      {isCap ? capChar : char}
    </Animated.Text>
  )
}

export function Capitalize({
  text,
  stagger = 80,
  delay = 0,
  style,
}: CapitalizeProps) {
  return (
    <View style={styles.row}>
      {Array.from(text).map((c, i) => (
        <Char
          key={i}
          char={c}
          capChar={c.toUpperCase()}
          index={i}
          stagger={stagger}
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
