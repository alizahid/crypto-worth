process.env.TZ = 'Asia/Dhaka'

import {
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
  formatISO,
  getDayOfYear,
  parseISO,
  setMonth,
  startOfMonth,
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

  const days = (interval === 'all' ? differenceInWeeks : differenceInDays)(
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
    formatISO((interval === 'all' ? subWeeks : subDays)(today, index), {
      representation: 'date'
    })
  )

  const rates = await prisma.rate.findMany({
    orderBy: {
      date: 'asc'
    },
    where: {
      date: {
        in: dates
      }
    }
  })

  const data = rates.map(({ date, rates }) => ({
    x: date,
    y: rates[currency]
  }))

  const tickValues = (interval === 'week'
    ? [1, 3, 5]
    : interval === 'month'
    ? [4, 8, 12, 16, 20, 24]
    : interval === 'year'
    ? [2, 4, 6, 8, 10].map((month) =>
        getDayOfYear(startOfMonth(setMonth(new Date(), month)))
      )
    : []
  ).map((index) => data[index].x)

  return {
    data,
    tickValues
  }
}
