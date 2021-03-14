import React from 'react'

export const IntervalPicker = ({ className, onChange, value }) => (
  <div className={`bg-white flex items-center max-w-lg ${className}`}>
    {[
      {
        id: 'week',
        label: '1W'
      },
      {
        id: 'month',
        label: '1M'
      },
      {
        id: 'year',
        label: '1Y'
      },
      {
        id: 'all',
        label: 'ALL'
      }
    ].map(({ id, label }) => (
      <div
        className={`cursor-pointer p-4 ${
          id === value
            ? 'bg-emerald-500 text-white font-semibold'
            : 'transition-colors hover:bg-emerald-100'
        }`}
        key={id}
        onClick={() => onChange(id)}>
        {label}
      </div>
    ))}
  </div>
)
