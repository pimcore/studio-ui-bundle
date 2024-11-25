/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { isEmpty } from 'lodash'

interface IErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  showAlert?: (content: string) => void
}

interface IErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor (props: IErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError (error: Error): IErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render (): ReactNode {
    const { children, fallback, showAlert } = this.props

    const { hasError, error } = this.state

    if (hasError) {
      if (fallback !== null) return fallback

      !isEmpty(showAlert) && showAlert(error?.message ?? 'Something went wrong.')
    }

    return children
  }
}

export default ErrorBoundary
