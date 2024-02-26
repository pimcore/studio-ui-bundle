import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppView } from '../app-view'

export function runApp (): void {
  const domElement = document.getElementById('app')

  if (domElement === null) {
    throw new Error('Root element not found')
  }

  const root = createRoot(domElement)
  root.render(<AppView />)
}
