// Let's make <Card text='Write the docs' /> draggable!

import React from 'react'
import { useDrag } from 'react-dnd'
console.log("Card.tsx")
/**
 * Your Component
 */
export default function Card({ isDragging, text }: any) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}