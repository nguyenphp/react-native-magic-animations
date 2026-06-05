import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface StrikeProps {
  text: string
  color?: string
  thickness?: number
  duration?: number
  delay?: number
  style?: TextStyle
}

export function Strike({
  text,
  color = '#EF4444',
  thickness = 2,
  duration = 500,
  delay = 0,
  style,
}: StrikeProps) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const progress = useSharedValue(0)

  useEffect(() => {
    if (size.w > 0) {
      progress.value = withDelay(
        delay,
        withTiming(1, { duration, easing: Easing.out(Easing.cubic) })
      )
    }
  }, [size.w])

  const animStyle = useAnimatedStyle(() => ({
    width: size.w * progress.value,
  }))

  function onLayout(e: LayoutChangeEvent) {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  }

  return (
    <View style={styles.wrapper}>
      <Text style={style} onLayout={onLayout}>{text}</Text>
      <Animated.View
        style={[
          styles.strike,
          {
            backgroundColor: color,
            height: thickness,
            top: size.h / 2 - thickness / 2,
          },
          animStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'flex-start', position: 'relative' },
  strike: { position: 'absolute', left: 0, borderRadius: 99 },
})
