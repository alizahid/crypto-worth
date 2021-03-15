import Link from 'next/link'
import React from 'react'

import { Logo } from './logo'

export const Header = () => (
  <header>
    <nav className="hidden items-center mb-8">
      <Link href="/">
        <a className="text-gray-500 font-medium">Calculator</a>
      </Link>
      <Link href="/charts">
        <a className="text-gray-500 font-medium ml-4">Charts</a>
      </Link>
    </nav>

    <div className="flex items-center">
      <Logo />
      <h1 className="text-2xl font-semibold flex-1 ml-4">
        What would my crypto investment be worth today?
      </h1>
    </div>
  </header>
)
