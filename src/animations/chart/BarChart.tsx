import React, { useEffect } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface BarChartProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  gap?: number
  stagger?: number
  duration?: number
  radius?: number
  style?: ViewStyle
}

function Bar({
  value,
  max,
  width,
  height,
  color,
  delay,
  duration,
  radius,
}: {
  value: number
  max: number
  width: number
  height: number
  color: string
  delay: number
  duration: number
  radius: number
}) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = 0
    progress.value = withDelay(
      delay,
      withTiming(value / max, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    )
  }, [value, max, delay])

  const animStyle = useAnimatedStyle(() => ({
    height: height * progress.value,
  }))

  return (
    <Animated.View
      style={[
        {
          width,
          backgroundColor: color,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        },
        animStyle,
      ]}
    />
  )
}

export function BarChart({
  data,
  width = 320,
  height = 180,
  color = '#10B981',
  gap = 6,
  stagger = 100,
  duration = 800,
  radius = 4,
  style,
}: BarChartProps) {
  const max = Math.max(...data, 1)
  const barWidth = (width - gap * (data.length - 1)) / data.length

  return (
    <View style={[styles.container, { width, height }, style]}>
      {data.map((v, i) => (
        <View key={i} style={{ marginRight: i < data.length - 1 ? gap : 0, justifyContent: 'flex-end' }}>
          <Bar
            value={v}
            max={max}
            width={barWidth}
            height={height}
            color={color}
            delay={i * stagger}
            duration={duration}
            radius={radius}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})
