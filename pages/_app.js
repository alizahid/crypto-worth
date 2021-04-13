import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

import { usePanelbear } from 'next-use-panelbear'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

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
