process.env.TZ = 'Asia/Dhaka'

import {
  differenceInDays,
  formatISO,
  parseISO,
  subDays,
  subMonths,
  subWeeks,
  subYears
} from 'date-fns'

import { prisma } from './prisma'

export const getChartData = async (currency, interval) => {
  const coin = await prisma.currency.findUnique({
    where: {
      id: currency
    }
  })

  if (!coin) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

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

  const oldest = await prisma.rate.findUnique({
    where: {
      date: coin.added
    }
  })

  if (!oldest) {
    return res.status(404).json({
      error: 'Data not found'
    })
  }

  const today = parseISO(latest.date)
  const initial = parseISO(oldest.date)

  const days = differenceInDays(
    today,
    interval === 'week'
      ? subWeeks(today, 1)
      : interval === 'month'
      ? subMonths(today, 1)
      : interval === 'year'
      ? subYears(today, 1)
      : initial
  )

  const dates = new Array(days).fill(0).map((i, index) =>
    formatISO(subDays(today, index), {
      representation: 'date'
    })
  )

  const data = await prisma.rate.findMany({
    orderBy: {
      date: 'asc'
    },
    where: {
      date: {
        in: dates
      }
    }
  })

  return data.map(({ date, rates }) => ({
    x: date,
    y: rates[currency]
  }))
}
