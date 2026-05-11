'use client'
import React from 'react'

interface Props {
    error: Error;
    
}
export default function error({ error }: Props) {
  return (
    <div>Something went wrong: {error.message}</div>
  )
}
