import { formatISO, parseISO } from 'date-fns'

import rates from '../../data/rates.json'

const handler = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      error: 'Invalid method'
    })
  }

  const { amount, currency, date } = req.body

  if (!amount) {
    return res.status(400).json({
      error: 'Amount is required'
    })
  }

  if (!currency) {
    return res.status(400).json({
      error: 'Currency is required'
    })
  }

  if (!date) {
    return res.status(400).json({
      error: 'Date is required'
    })
  }

  const key = formatISO(parseISO(date), {
    representation: 'date'
  })

  const data = rates[key]

  if (!data) {
    return res.status(400).json({
      error: 'Data not found 1'
    })
  }

  if (!data[currency]) {
    return res.status(400).json({
      error: 'Data not found 2'
    })
  }

  const quantity = amount / data[currency]

  const [[today, latest]] = Object.entries(rates).reverse()

  if (!latest[currency]) {
    return res.status(400).json({
      error: 'Data not found 3'
    })
  }

  const total = quantity * latest[currency]

  res.json({
    amount,
    date: key,
    latest: latest[currency],
    quantity,
    price: data[currency],
    today: today,
    total
  })
}

export default handler
