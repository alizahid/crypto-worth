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

      <div className="my-2">
        <span>in</span>
        <span className="font-semibold ml-2">{currency.name}</span>
        <span className="ml-2">on</span>
        <span className="font-semibold ml-2">
          {parseAndFormatDate(data.initial.date)}
        </span>
      </div>

      <div className="my-2">
        <span>when it was</span>
        <span className="font-semibold ml-2">
          {formatCurrency(data.initial.price)}
        </span>
        <span className="ml-2">per {currency.id}</span>
      </div>

      <div className="my-2">
        <span>you would get</span>
        <span className="font-semibold ml-2">
          {formatQuantity(data.quantity)}
        </span>
        <span className="ml-2">{currency.id}</span>
      </div>

      <div className="my-2">which would be worth</div>

      <div className="font-semibold my-2 text-xl">
        {formatCurrency(data.total)}
      </div>

      <div className="my-2">
        <span>on</span>
        <span className="font-semibold ml-2">
          {parseAndFormatDate(data.latest.date)}
        </span>
      </div>

      <div>
        <span className="font-semibold">
          {formatCurrency(data.latest.price)}
        </span>
        <span className="ml-2">per {currency.id}</span>
      </div>
    </div>
  </div>
)
