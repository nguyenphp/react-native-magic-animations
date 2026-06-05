import React, { useEffect, useRef, useState } from 'react'
import { Text, TextProps } from 'react-native'

interface DecodeProps extends Omit<TextProps, 'children'> {
  text: string
  charset?: string
  duration?: number
  onDone?: () => void
}

export function Decode({
  text,
  charset = '01ABCDEF',
  duration = 1500,
  onDone,
  style,
  ...props
}: DecodeProps) {
  const [display, setDisplay] = useState(() =>
    text.replace(/./g, () => charset[Math.floor(Math.random() * charset.length)]!)
  )
  const startRef = useRef(0)

  useEffect(() => {
    startRef.current = Date.now()
    let rafId: number | null = null
    let done = false

    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const progress = Math.min(1, elapsed / duration)
      const resolved = Math.floor(progress * text.length)

      let next = ''
      for (let i = 0; i < text.length; i++) {
        if (i < resolved) {
          next += text[i]
        } else if (text[i] === ' ') {
          next += ' '
        } else {
          next += charset[Math.floor(Math.random() * charset.length)]
        }
      }
      setDisplay(next)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else if (!done) {
        done = true
        setDisplay(text)
        onDone?.()
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [text, duration, charset])

  return (
    <Text style={style} {...props}>
      {display}
    </Text>
  )
}
