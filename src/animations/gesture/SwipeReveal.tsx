import React, { useRef } from 'react'
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface SwipeAction {
  label?: string
  icon?: React.ReactNode
  color: string
  onPress: () => void
}

interface SwipeRevealProps extends ViewProps {
  actions?: SwipeAction[]
  actionWidth?: number
}

export function SwipeReveal({
  actions = [],
  actionWidth = 80,
  style,
  children,
  ...props
}: SwipeRevealProps) {
  const tx = useSharedValue(0)
  const startX = useRef(0)
  const totalWidth = actions.length * actionWidth

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8,
      onPanResponderGrant: () => {
        startX.current = tx.value
      },
      onPanResponderMove: (_, g) => {
        const next = startX.current + g.dx
        tx.value = Math.max(-totalWidth, Math.min(0, next))
      },
      onPanResponderRelease: (_, g) => {
        const final = startX.current + g.dx
        if (final < -actionWidth / 2) {
          tx.value = withSpring(-totalWidth, { damping: 18, stiffness: 220 })
        } else {
          tx.value = withSpring(0, { damping: 18, stiffness: 220 })
        }
      },
    })
  ).current

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }))

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <View style={[styles.actions, { width: totalWidth }]}>
        {actions.map((a, i) => (
          <Pressable
            key={i}
            onPress={() => {
              tx.value = withSpring(0)
              a.onPress()
            }}
            style={[
              styles.action,
              { width: actionWidth, backgroundColor: a.color },
            ]}
          >
            {a.icon}
            {a.label && <Text style={styles.label}>{a.label}</Text>}
          </Pressable>
        ))}
      </View>
      <Animated.View style={[styles.row, rowStyle]} {...pan.panHandlers}>
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', overflow: 'hidden' },
  actions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: '#fff', fontWeight: '600', marginTop: 4 },
  row: {},
})
