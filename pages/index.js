import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { formatISO, parseISO } from 'date-fns'
import Head from 'next/head'
import { useState } from 'react'

import { AmountPicker } from '../components/amount-picker'
import { Calculation } from '../components/calculation'
import { CurrencyPicker } from '../components/currency-picker'
import { DatePicker } from '../components/date-picker'
import { Modal } from '../components/modal'

const Home = ({ currencies, defaultCurrency, maxDate }) => {
  const start = parseISO(defaultCurrency.added)

  const [currency, setCurrency] = useState(defaultCurrency)
  const [date, setDate] = useState(start)
  const [minDate, setMinDate] = useState(start)
  const [amount, setAmount] = useState(100)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  return (
    <>
      <Head>
        <title>What would my crypto investment be worth today?</title>
      </Head>

      <main>
        <div className="text-gray-600 font-medium">Currency</div>
        <CurrencyPicker
          className="mt-2"
          currencies={currencies}
          onChange={(currency) => {
            setCurrency(currency)

            setDate(parseISO(currency.added))
            setMinDate(parseISO(currency.added))

            setData()
          }}
          value={currency}
        />

        <div className="text-gray-600 font-medium mt-8">Date of investment</div>
        <DatePicker
          className="mt-2"
          maxDate={parseISO(maxDate)}
          minDate={minDate}
          onChange={(date) => {
            setDate(date)

            setData()
          }}
          value={date}
        />

        <div className="text-gray-600 font-medium mt-8">Amount</div>
        <AmountPicker
          className="mt-2"
          onChange={(amount) => {
            setAmount(amount)

            setData()
          }}
          value={amount}
        />

        <button
          className="mt-8"
          disabled={loading}
          onClick={async () => {
            setLoading(true)

            try {
              const { data } = await axios({
                data: {
                  amount,
                  currency: currency.id,
                  date: formatISO(date, {
                    representation: 'date'
                  })
                },
                method: 'post',
                url: '/api/calculate'
              })

              setData(data)
            } finally {
              setLoading(false)
            }
          }}>
          {loading ? 'Calculating' : 'Calculate'}
        </button>

        <Modal onClose={() => setData()} visible={!!data}>
          {data && <Calculation currency={currency} data={data} />}
        </Modal>
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

  const { date } = await prisma.rate.findFirst({
    orderBy: {
      date: 'desc'
    }
  })

  return {
    props: {
      currencies,
      defaultCurrency: currencies[0],
      maxDate: date
    }
  }
}

export default Home
