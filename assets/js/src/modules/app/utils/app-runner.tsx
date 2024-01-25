import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../components/app'

export function runApp (): void {
  const domElement = document.getElementById('app')

  if (domElement === null) {
    throw new Error('Root element not found')
  }

  const root = createRoot(domElement)
  root.render(<App />)
}
