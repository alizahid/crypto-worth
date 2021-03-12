import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

const CryptoWorth = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
)

export default CryptoWorth
