import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

import { usePanelbear } from '../hooks/bear'

const CryptoWorth = ({ Component, pageProps }) => {
  usePanelbear('2kbPdGhtw5X')

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default CryptoWorth
