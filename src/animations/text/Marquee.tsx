import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface MarqueeProps {
  text: string
  speed?: number
  spacing?: number
  style?: TextStyle
}

export function Marquee({
  text,
  speed = 60,
  spacing = 40,
  style,
}: MarqueeProps) {
  const [textWidth, setTextWidth] = useState(0)
  const tx = useSharedValue(0)

  useEffect(() => {
    if (textWidth > 0) {
      const distance = textWidth + spacing
      const duration = (distance / speed) * 1000
      tx.value = 0
      tx.value = withRepeat(
        withTiming(-distance, { duration, easing: Easing.linear }),
        -1,
        false
      )
    }
  }, [textWidth, speed, spacing])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.row, animStyle]}>
        <Text
          style={style}
          numberOfLines={1}
          onLayout={(e: LayoutChangeEvent) =>
            setTextWidth(e.nativeEvent.layout.width)
          }
        >
          {text}
        </Text>
        <View style={{ width: spacing }} />
        <Text style={style} numberOfLines={1}>
          {text}
        </Text>
        <View style={{ width: spacing }} />
        <Text style={style} numberOfLines={1}>
          {text}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  row: { flexDirection: 'row' },
})
