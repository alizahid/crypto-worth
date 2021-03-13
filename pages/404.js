import Head from 'next/head'
import React from 'react'

const NotFound = () => (
  <>
    <Head>
      <title>Not found / What would my crypto investment be worth today?</title>
    </Head>

    <main className="flex flex-col justify-center">
      <h2 className="text-6xl font-semibold">Oops!</h2>
      <div className="mt-4 text-xl font-medium">
        We can&#39;t seem to find the page you&#39;re looking for.
      </div>
    </main>
  </>
)

export default NotFound
