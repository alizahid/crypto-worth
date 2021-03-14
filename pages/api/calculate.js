process.env.TZ = 'Asia/Dhaka'

import { PrismaClient } from '@prisma/client'
import { formatISO, parseISO } from 'date-fns'

const handler = async (req, res) => {
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

  const prisma = new PrismaClient()

  const initial = await prisma.rate.findUnique({
    where: {
      date: formatISO(parseISO(date), {
        representation: 'date'
      })
    }
  })

  if (!initial) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

  if (!initial.rates[currency]) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

  const quantity = amount / initial.rates[currency]

  const latest = await prisma.rate.findFirst({
    orderBy: {
      date: 'desc'
    }
  })

  if (!latest) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

  if (!latest.rates[currency]) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

  const total = quantity * latest.rates[currency]

  res.json({
    amount,
    initial: {
      date: initial.date,
      price: initial.rates[currency]
    },
    latest: {
      date: latest.date,
      price: latest.rates[currency]
    },
    quantity,
    total
  })
}

export default handler
