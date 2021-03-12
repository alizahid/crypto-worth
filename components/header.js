import React from 'react'

import { Logo } from './logo'

export const Header = () => (
  <header className="flex items-center">
    <Logo />
    <h1 className="text-2xl font-semibold flex-1 ml-4">
      What would my crypto investment be worth today?
    </h1>
  </header>
)
