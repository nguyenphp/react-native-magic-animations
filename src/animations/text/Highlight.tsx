import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface HighlightProps {
  text: string
  color?: string
  duration?: number
  delay?: number
  style?: TextStyle
}

export function Highlight({
  text,
  color = '#FDE68A',
  duration = 600,
  delay = 0,
  style,
}: HighlightProps) {
  const [width, setWidth] = useState(0)
  const progress = useSharedValue(0)

  useEffect(() => {
    if (width > 0) {
      progress.value = withDelay(
        delay,
        withTiming(1, { duration, easing: Easing.out(Easing.cubic) })
      )
    }
  }, [width])

  const animStyle = useAnimatedStyle(() => ({
    width: width * progress.value,
  }))

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.highlight,
          { backgroundColor: color },
          animStyle,
        ]}
      />
      <Text
        style={style}
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'flex-start', position: 'relative' },
  highlight: {
    position: 'absolute',
    left: 0,
    top: 2,
    bottom: 2,
    borderRadius: 3,
  },
})
