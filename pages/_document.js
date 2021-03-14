import Document, { Html, Head, Main, NextScript } from 'next/document'

class CryptoWorth extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context)

    return {
      ...initialProps
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CryptoWorth
