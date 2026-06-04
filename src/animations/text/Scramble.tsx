import React, { useEffect, useState } from 'react'
import { Text, TextProps } from 'react-native'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

interface ScrambleProps extends TextProps {
  text: string
  duration?: number
  onDone?: () => void
}

export function Scramble({ text, duration = 1200, onDone, style, ...props }: ScrambleProps) {
  const [displayed, setDisplayed] = useState(text)

  useEffect(() => {
    const totalFrames = Math.floor(duration / 30)
    let frame = 0

    const interval = setInterval(() => {
      const progress = frame / totalFrames
      const resolved = Math.floor(progress * text.length)

      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      frame++
      if (frame > totalFrames) {
        clearInterval(interval)
        setDisplayed(text)
        onDone?.()
      }
    }, 30)

    return () => clearInterval(interval)
  }, [text, duration])

  return (
    <Text style={style} {...props}>
      {displayed}
    </Text>
  )
}
