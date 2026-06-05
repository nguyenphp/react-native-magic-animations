import React, { useEffect } from 'react'
import { View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

interface StarProps extends ViewProps {
  size?: number
  color?: string
  twinkle?: boolean
}

export function Star({
  size = 24,
  color = '#FDE68A',
  twinkle = true,
  style,
  ...props
}: StarProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  useEffect(() => {
    if (!twinkle) {
      scale.value = 1
      opacity.value = 1
      return
    }
    const ease = Easing.inOut(Easing.sin)
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: ease }),
        withTiming(0.9, { duration: 800, easing: ease })
      ),
      -1,
      true
    )
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600, easing: ease }),
        withTiming(0.5, { duration: 600, easing: ease })
      ),
      -1,
      true
    )
  }, [twinkle])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[{ width: size, height: size }, style, animStyle]} {...props}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M12 0 L13.5 9.5 L24 12 L13.5 14.5 L12 24 L10.5 14.5 L0 12 L10.5 9.5 Z"
          fill={color}
        />
      </Svg>
    </Animated.View>
  )
}
