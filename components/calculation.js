import React from 'react'

import {
  formatCurrency,
  formatQuantity,
  parseAndFormatDate
} from '../lib/helpers'

export const Calculation = ({ currency, data }) => (
  <div className="flex flex-col lg:flex-row lg:items-center bg-emerald-700 text-white p-4">
    <img className="h-12 w-12" src={currency.icon} />
    <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
      <div>If you had invested</div>

      <div className="font-semibold my-2 text-xl">
        {formatCurrency(data.amount)}
      </div>

      <div>
        <span>in</span>
        <span className="font-semibold ml-2">{currency.name}</span>
        <span className="ml-2">in</span>
        <span className="font-semibold ml-2">
          {parseAndFormatDate(data.date)}{' '}
        </span>
      </div>

      <div>
        <span>when it was</span>
        <span className="font-semibold ml-2">{formatCurrency(data.price)}</span>
        <span className="ml-2">per {currency.symbol}</span>
      </div>

      <div>
        <span>you would get</span>
        <span className="font-semibold ml-2">
          {formatQuantity(data.quantity)}
        </span>
        <span className="ml-2">{currency.symbol}</span>
      </div>

      <div>which would be worth</div>

      <div className="font-semibold my-2 text-xl">
        {formatCurrency(data.total)}
      </div>

      <div>
        <span>in</span>
        <span className="font-semibold ml-2">
          {parseAndFormatDate(data.today)}
        </span>
      </div>
    </div>
  </div>
)
