import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface RevealMaskProps {
  text: string
  duration?: number
  delay?: number
  style?: TextStyle
}

export function RevealMask({
  text,
  duration = 700,
  delay = 0,
  style,
}: RevealMaskProps) {
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

  if (width === 0) {
    return (
      <Text
        style={[style, { opacity: 0 }]}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        {text}
      </Text>
    )
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.clip, animStyle]}>
        <Text style={[style, { width }]} numberOfLines={1}>
          {text}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'flex-start' },
  clip: { overflow: 'hidden' },
})
