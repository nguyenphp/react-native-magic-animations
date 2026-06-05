import React, { useEffect } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface FlipCardProps {
  flipped: boolean
  front: React.ReactNode
  back: React.ReactNode
  axis?: 'X' | 'Y'
  duration?: number
  perspective?: number
  style?: ViewStyle
}

export function FlipCard({
  flipped,
  front,
  back,
  axis = 'Y',
  duration = 500,
  perspective = 1000,
  style,
}: FlipCardProps) {
  const rot = useSharedValue(0)

  useEffect(() => {
    rot.value = withTiming(flipped ? 180 : 0, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [flipped, duration])

  const frontStyle = useAnimatedStyle(() => {
    const r = `${rot.value}deg`
    return {
      transform: [
        { perspective },
        axis === 'Y' ? { rotateY: r } : { rotateX: r },
      ],
      opacity: rot.value < 90 ? 1 : 0,
      backfaceVisibility: 'hidden',
    }
  })

  const backStyle = useAnimatedStyle(() => {
    const r = `${rot.value + 180}deg`
    return {
      transform: [
        { perspective },
        axis === 'Y' ? { rotateY: r } : { rotateX: r },
      ],
      opacity: rot.value >= 90 ? 1 : 0,
      backfaceVisibility: 'hidden',
    }
  })

  return (
    <View style={style}>
      <Animated.View style={[styles.face, frontStyle]}>{front}</Animated.View>
      <Animated.View style={[styles.face, styles.back, backStyle]}>
        {back}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  face: { backfaceVisibility: 'hidden' },
  back: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
})
