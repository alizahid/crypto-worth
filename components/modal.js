import React from 'react'

export const Modal = ({ children, footer, header, onClose, visible }) => (
  <div
    className={`fixed top-0 right-0 bottom-0 left-0 bg-modal flex items-center justify-center z-30 transition-opacity p-8 ${
      visible
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    }`}
    onClick={(event) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    }}>
    <div className="flex flex-col bg-white text-black overflow-hidden max-h-full w-full lg:w-96">
      {header}
      <div
        className={`max-h-full overflow-y-auto border-gray-200 ${
          header ? 'border-t' : ''
        } ${footer ? 'border-b' : ''}`}>
        {children}
      </div>
      {footer}
    </div>
  </div>
)
