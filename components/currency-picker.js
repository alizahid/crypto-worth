import React, { useState } from 'react'

import { Icon } from './icon'
import { Modal } from './modal'

export const CurrencyPicker = ({ className, currencies, onChange, value }) => {
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      <div
        className={`bg-white p-4 flex items-center max-w-lg ${className}`}
        onClick={() => setVisible(true)}>
        <div
          className={`flex-1 flex items-center ${value ? 'font-medium' : ''}`}>
          <img className="h-6 w-6 mr-4" src={value.icon} />
          {value.name ?? 'Currency'}
        </div>
        <Icon className="text-rose-600 ml-4" name="expand" />
      </div>

      <Modal
        header={
          <div>
            <div className="font-semibold text-xl m-4">Currencies</div>
            <input
              className="border-t border-gray-100"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              type="text"
              value={query}
            />
          </div>
        }
        onClose={() => setVisible(false)}
        visible={visible}>
        {currencies
          .filter(
            ({ name, id }) =>
              name.toLowerCase().includes(query.toLowerCase()) ||
              id.toLowerCase().includes(query.toLowerCase())
          )
          .map((currency) => (
            <div
              className="flex items-center border-t first:border-t-0 border-gray-100 cursor-pointer transition-colors hover:bg-gray-100 p-4"
              onClick={() => {
                onChange(currency)

                setVisible(false)
              }}
              key={currency.id}>
              <img className="h-8 w-8" src={currency.icon} />
              <div className="flex-1 ml-4">{currency.name}</div>
              {value.id === currency.id && (
                <Icon className="text-emerald-500 ml-4" name="check" />
              )}
            </div>
          ))}
      </Modal>
    </>
  )
}
