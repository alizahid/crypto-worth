import React, { useState } from 'react'

import { Icon } from './icon'
import { Modal } from './modal'

import { formatCurrency } from '../lib/helpers'

export const AmountPicker = ({ className, onChange, value }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className={`bg-white p-4 flex items-center max-w-lg ${className}`}
        onClick={() => setVisible(true)}>
        <div
          className={`flex-1 flex items-center ${value ? 'font-medium' : ''}`}>
          {value ? formatCurrency(value) : 'Currency'}
        </div>
        <Icon className="text-violet-600 ml-4" name="dollar" />
      </div>

      <Modal
        header={
          <div>
            <div className="font-semibold text-xl m-4">Amount</div>
            <input
              className="border-t border-gray-100"
              onChange={(event) =>
                onChange(Number(event.target.value.replace(/([^\d]+)/g, '')))
              }
              placeholder="Search"
              type="text"
              value={String(value)}
            />
          </div>
        }
        onClose={() => setVisible(false)}
        visible={visible}>
        {[10, 50, 100, 500, 1000, 5000, 10000].map((amount) => (
          <div
            className="flex items-center border-t first:border-t-0 border-gray-100 cursor-pointer transition-colors hover:bg-gray-100 p-4"
            onClick={() => {
              onChange(amount)

              setVisible(false)
            }}
            key={amount}>
            <div className="flex-1">{formatCurrency(amount)}</div>
            {value === amount && (
              <Icon className="text-emerald-500 ml-4" name="check" />
            )}
          </div>
        ))}
      </Modal>
    </>
  )
}
