import Link from 'next/link'
import React from 'react'

import { Icon } from './icon'

export const Footer = () => (
  <footer className="flex items-center text-gray-500 text-sm">
    Built with
    <Icon className="text-rose-500 mx-2" name="heart" />
    by
    <Link href="https://alizahid.dev">
      <a className="ml-2 text-gray-700">Ali Zahid</a>
    </Link>
  </footer>
)
