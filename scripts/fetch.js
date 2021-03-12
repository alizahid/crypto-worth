const { COINLAYER_KEY } = process.env

const {
  promises: { readFile, writeFile }
} = require('fs')
const { resolve } = require('path')

const axios = require('axios')
const {
  addMonths,
  differenceInMonths,
  formatISO,
  parseISO
} = require('date-fns')

const paths = {
  currencies: resolve('data', 'currencies.json'),
  rates: resolve('data', 'rates.json')
}

const fetchRates = async () => {
  const beginning = new Date(2011, 0)
  const months = differenceInMonths(new Date(), beginning)

  const data = await Promise.all(
    new Array(months).fill(0).map(async (i, index) => {
      const date = formatISO(addMonths(beginning, index), {
        representation: 'date'
      })

      const {
        data: { rates }
      } = await axios({
        params: {
          access_key: COINLAYER_KEY
        },
        url: `http://api.coinlayer.com/${date}`
      })

      return {
        date,
        rates
      }
    })
  )

  const rates = data.reduce((data, { date, rates }) => {
    data[date] = rates

    return data
  }, {})

  await writeFile(paths.rates, JSON.stringify(rates, null, 2), 'utf-8')
}

const fetchList = async () => {
  const rates = JSON.parse(await readFile(paths.rates, 'utf-8'))

  const {
    data: { crypto }
  } = await axios({
    params: {
      access_key: COINLAYER_KEY
    },
    url: 'http://api.coinlayer.com/list'
  })

  const currencies = Object.values(crypto)
    .map(({ icon_url, name, symbol }) => {
      const start = Object.entries(rates)
        .map(([date, data]) => {
          if (Object.keys(data).includes(symbol)) {
            return date
          }
        })
        .filter(Boolean)
        .shift()

      return {
        symbol,
        name,
        icon: icon_url,
        start
      }
    })
    .sort((one, two) => parseISO(one.start) - parseISO(two.start))

  await writeFile(
    paths.currencies,
    JSON.stringify(currencies, null, 2),
    'utf-8'
  )
}

const main = async () => {
  await fetchRates()
  // await fetchList()
}

main()
