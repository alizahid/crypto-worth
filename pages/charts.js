import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Chart } from '../components/chart'
import { CurrencyPicker } from '../components/currency-picker'
import { IntervalPicker } from '../components/interval-picker'

import { getChartData } from '../lib/api'
import { prisma } from '../lib/prisma'

const Charts = ({ currencies, data, currency, interval }) => {
  const { events, push } = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onStart = () => setLoading(true)
    const onEnd = () => setLoading(false)

    events.on('routeChangeStart', onStart)
    events.on('routeChangeComplete', onEnd)
    events.on('routeChangeError', onEnd)

    return () => {
      events.off('routeChangeStart', onStart)
      events.off('routeChangeComplete', onEnd)
      events.off('routeChangeError', onEnd)
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {currency.name} / Charts / What would my crypto investment be worth
          today?
        </title>
        <meta
          name="description"
          content="What would my crypto investment be worth today?"
        />
      </Head>

      <main>
        <h2 className="text-4xl font-semibold">Charts</h2>

        <div
          className={`lg:flex lg:mt-8 ${
            loading ? 'pointer-events-none cursor-wait' : ''
          }`}>
          <div className="lg:w-96">
            <div className="text-gray-600 font-medium mt-8 lg:mt-0">
              Currency
            </div>
            <CurrencyPicker
              className="mt-2"
              currencies={currencies}
              onChange={(currency) =>
                push(`/charts?currency=${currency.id}&interval=${interval}`)
              }
              value={currency}
            />
          </div>

          <div className="lg:ml-8">
            <div className="text-gray-600 font-medium mt-8 lg:mt-0">
              Interval
            </div>
            <IntervalPicker
              className="mt-2"
              onChange={(interval) =>
                push(`/charts?currency=${currency.id}&interval=${interval}`)
              }
              value={interval}
            />
          </div>
        </div>

        <div className="bg-white h-96 w-full mt-8 relative">
          <Chart data={data} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const currencies = await prisma.currency.findMany({
    orderBy: {
      added: 'asc'
    }
  })

  const currency =
    currencies.find(({ id }) => id === query?.currency) ?? currencies[0]
  const interval = query?.interval ?? 'week'

  const data = await getChartData(currency.id, interval)

  return {
    props: {
      currencies,
      currency,
      data,
      interval
    }
  }
}

export default Charts
