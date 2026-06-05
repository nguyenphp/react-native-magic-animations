import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface UnderlineProps {
  text: string
  color?: string
  thickness?: number
  duration?: number
  delay?: number
  style?: TextStyle
}

export function Underline({
  text,
  color = '#10B981',
  thickness = 2,
  duration = 500,
  delay = 0,
  style,
}: UnderlineProps) {
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
      <Text
        style={style}
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      >
        {text}
      </Text>
      <Animated.View
        style={[
          styles.line,
          {
            backgroundColor: color,
            height: thickness,
            bottom: -thickness - 1,
          },
          animStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'flex-start', position: 'relative' },
  line: { position: 'absolute', left: 0, borderRadius: 99 },
})
