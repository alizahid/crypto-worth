import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { Logo } from './logo'

export const Header = () => {
  const { asPath } = useRouter()

  return (
    <header>
      <nav className="flex items-center">
        <Link href="/">
          <a
            className={`font-medium ${
              asPath === '/' ? 'text-emerald-700' : 'text-black'
            }`}>
            Calculator
          </a>
        </Link>
        <Link href="/charts">
          <a
            className={`font-medium ml-4 ${
              asPath === '/charts' ? 'text-emerald-500' : 'text-black'
            }`}>
            Charts
          </a>
        </Link>
      </nav>

      <div className="flex items-center mt-8">
        <Logo />
        <h1 className="text-2xl font-semibold flex-1 ml-4">
          What would my crypto investment be worth today?
        </h1>
      </div>
    </header>
  )
}
