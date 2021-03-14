import React from 'react'

export const Spinner = ({ className, light }) => (
  <div
    className={`animate-spin h-6 w-6 rounded-full border-2 ${
      light ? 'border-white' : 'border-emerald-500'
    } ${className}`}
    style={{
      borderTopColor: 'transparent'
    }}
  />
)
