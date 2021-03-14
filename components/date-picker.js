import { addMonths, addYears, format, isAfter, isBefore } from 'date-fns'
import React, { useState } from 'react'

import { Icon } from './icon'
import { Modal } from './modal'

export const DatePicker = ({
  className,
  maxDate,
  minDate,
  onChange,
  value
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className={`bg-white p-4 flex items-center max-w-lg ${className}`}
        onClick={() => setVisible(true)}>
        <div
          className={`flex-1 flex items-center ${
            value ? 'font-medium text-black' : 'text-gray-500'
          }`}>
          {value ? format(value, 'MMMM y') : 'Date'}
        </div>
        <Icon className="text-teal-600 ml-4" name="calendar" />
      </div>

      <Modal
        header={
          <div className="font-semibold text-xl m-4">Date of investment</div>
        }
        onClose={() => setVisible(false)}
        visible={visible}>
        <div className="flex items-center justify-center m-4">
          {[-1, 0, 1].map((index) => {
            const date = addYears(value, index)
            const disabled = isBefore(date, minDate) || isAfter(date, maxDate)

            return (
              <div
                className={`font-medium cursor-pointer text-white p-3 ${
                  disabled
                    ? 'bg-gray-600'
                    : index === -1
                    ? 'bg-violet-500'
                    : index === 0
                    ? 'bg-violet-700'
                    : 'bg-violet-600'
                }`}
                key={`year-${index}`}
                onClick={() => {
                  if (disabled) {
                    return
                  }

                  onChange(date)
                }}>
                {format(date, 'y')}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-center m-4">
          {[-1, 0, 1].map((index) => {
            const date = addMonths(value, index)
            const disabled = isBefore(date, minDate) || isAfter(date, maxDate)

            return (
              <div
                className={`font-medium cursor-pointer text-white p-3 ${
                  disabled
                    ? 'bg-gray-600'
                    : index === -1
                    ? 'bg-pink-500'
                    : index === 0
                    ? 'bg-pink-700'
                    : 'bg-pink-600'
                }`}
                key={`month-${index}`}
                onClick={() => {
                  if (disabled) {
                    return
                  }

                  onChange(date)
                }}>
                {format(date, 'MMMM')}
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}
