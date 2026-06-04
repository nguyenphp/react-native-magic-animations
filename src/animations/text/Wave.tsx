import React, { useEffect } from 'react'
import { TextProps, View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface WaveProps extends TextProps {
  text: string
  amplitude?: number
  duration?: number
}

export function Wave({ text, amplitude = 6, duration = 400, style, ...props }: WaveProps) {
  const chars = text.split('')

  return (
    <View style={{ flexDirection: 'row' }}>
      {chars.map((char, i) => (
        <WaveChar key={i} char={char} index={i} amplitude={amplitude} duration={duration} style={style} {...props} />
      ))}
    </View>
  )
}

function WaveChar({
  char,
  index,
  amplitude,
  duration,
  style,
  ...props
}: { char: string; index: number; amplitude: number; duration: number } & TextProps) {
  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = withDelay(
      index * 60,
      withRepeat(
        withSequence(
          withTiming(-amplitude, { duration, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      )
    )
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.Text style={[style, animStyle]} {...props}>
      {char === ' ' ? ' ' : char}
    </Animated.Text>
  )
}
