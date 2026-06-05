import React, { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

interface RatingStarsProps extends ViewProps {
  value?: number
  max?: number
  size?: number
  activeColor?: string
  inactiveColor?: string
  stagger?: number
}

function StarShape({
  active,
  size,
  activeColor,
  inactiveColor,
  delay,
}: {
  active: boolean
  size: number
  activeColor: string
  inactiveColor: string
  delay: number
}) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = 0
    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.25, { duration: 180 }),
        withSpring(1, { damping: 7, stiffness: 220 })
      )
    )
  }, [active, delay])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[{ marginHorizontal: size * 0.1 }, animStyle]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M12 0 L13.5 9.5 L24 12 L13.5 14.5 L12 24 L10.5 14.5 L0 12 L10.5 9.5 Z"
          fill={active ? activeColor : inactiveColor}
        />
      </Svg>
    </Animated.View>
  )
}

export function RatingStars({
  value = 0,
  max = 5,
  size = 24,
  activeColor = '#FDE68A',
  inactiveColor = '#E5E7EB',
  stagger = 120,
  style,
  ...props
}: RatingStarsProps) {
  return (
    <View style={[styles.row, style]} {...props}>
      {Array.from({ length: max }, (_, i) => (
        <StarShape
          key={i}
          active={i < value}
          size={size}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          delay={i * stagger}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
})
