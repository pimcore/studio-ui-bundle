import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '@Pimcore/router/layouts/default'
import LoginLayout from '@Pimcore/router/layouts/login'

export const router = createBrowserRouter([
  {
    path: '/admin/studio',
    element: <DefaultLayout />
  },
  {
    path: '/admin/studio/login',
    element: <LoginLayout />
  }
])
