import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import { Chart } from '../components/chart'
import { CurrencyPicker } from '../components/currency-picker'
import { IntervalPicker } from '../components/interval-picker'

const Charts = ({ currencies, defaultCurrency }) => {
  const [currency, setCurrency] = useState(defaultCurrency)
  const [interval, setInterval] = useState('week')

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = useCallback(async (currency, interval) => {
    setLoading(true)

    try {
      const {
        data: { data }
      } = await axios({
        params: {
          currency: currency.id,
          interval
        },
        url: '/api/charts'
      })

      setData([])
      setData(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(currency, interval)
  }, [currency, interval])

  return (
    <>
      <Head>
        <title>Charts / What would my crypto investment be worth today?</title>
      </Head>

      <main>
        <h2 className="text-4xl font-semibold">Charts</h2>

        <div className="lg:flex lg:mt-8">
          <div className="lg:w-96">
            <div className="text-gray-600 font-medium mt-8 lg:mt-0">
              Currency
            </div>
            <CurrencyPicker
              className="mt-2"
              currencies={currencies}
              onChange={(currency) => setCurrency(currency)}
              value={currency}
            />
          </div>

          <div className="lg:ml-8">
            <div className="text-gray-600 font-medium mt-8 lg:mt-0">
              Interval
            </div>
            <IntervalPicker
              className="mt-2"
              onChange={(interval) => setInterval(interval)}
              value={interval}
            />
          </div>
        </div>

        <div className="bg-white h-96 w-full mt-8">
          <Chart data={data} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prisma = new PrismaClient()

  const currencies = await prisma.currency.findMany({
    orderBy: {
      added: 'asc'
    }
  })

  return {
    props: {
      currencies,
      defaultCurrency: currencies[0]
    }
  }
}

export default Charts
