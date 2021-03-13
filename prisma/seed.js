const { COINLAYER_KEY } = process.env

const { PrismaClient } = require('@prisma/client')
const axios = require('axios')
const { addDays, differenceInDays, formatISO } = require('date-fns')

const prisma = new PrismaClient()

const fetchRates = async () => {
  const beginning = new Date(2011, 0)
  const days = differenceInDays(new Date(), beginning)

  const data = await Promise.all(
    new Array(days).fill(0).map(async (i, index) => {
      const date = formatISO(addDays(beginning, index), {
        representation: 'date'
      })

      const {
        data: { rates }
      } = await axios({
        params: {
          access_key: COINLAYER_KEY
        },
        url: `https://api.coinlayer.com/${date}`
      })

      return {
        date,
        rates
      }
    })
  )

  await prisma.rate.createMany({
    data
  })
}

const fetchList = async () => {
  const {
    data: { crypto }
  } = await axios({
    params: {
      access_key: COINLAYER_KEY
    },
    url: 'https://api.coinlayer.com/list'
  })

  const data = await Promise.all(
    Object.values(crypto).map(async ({ icon_url, name, symbol }) => {
      const [
        { date }
      ] = await prisma.$queryRaw`SELECT "date" FROM "Rate" WHERE "rates"->${symbol} IS NOT NULL ORDER BY "date" ASC LIMIT 1`

      return {
        id: symbol,
        name,
        icon: icon_url,
        added: date
      }
    })
  )

  await prisma.currency.createMany({
    data
  })
}

const main = async () => {
  await fetchRates()
  await fetchList()
}

main()
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
