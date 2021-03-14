import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export const Modal = ({ children, footer, header, onClose, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        initial={{
          opacity: 0
        }}
        transition={{
          duration: 0.2
        }}
        className="fixed top-0 right-0 bottom-0 left-0 bg-modal flex items-center justify-center z-30 p-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}
        style={{
          cursor: 'zoom-out'
        }}>
        <div className="flex flex-col cursor-default bg-white text-black overflow-hidden max-h-full w-full lg:w-96">
          {header}
          <div
            className={`max-h-full overflow-y-auto border-gray-200 ${
              header ? 'border-t' : ''
            } ${footer ? 'border-b' : ''}`}>
            {children}
          </div>
          {footer}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)
