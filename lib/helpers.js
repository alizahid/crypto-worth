import { format, parseISO } from 'date-fns'

export const formatCurrency = (amount) =>
  amount.toLocaleString('en-US', {
    currency: 'USD',
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
    style: 'currency'
  })

export const formatQuantity = (quantity) =>
  quantity.toLocaleString('en-US', {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  })

export const parseAndFormatDate = (date) => format(parseISO(date), 'MMMM y')
