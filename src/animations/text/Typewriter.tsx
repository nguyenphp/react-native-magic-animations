import React, { useEffect, useState } from 'react'
import { Text, TextProps } from 'react-native'

interface TypewriterProps extends TextProps {
  text: string
  speed?: number
  onDone?: () => void
}

export function Typewriter({ text, speed = 50, onDone, style, ...props }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        onDone?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <Text style={style} {...props}>
      {displayed}
    </Text>
  )
}
