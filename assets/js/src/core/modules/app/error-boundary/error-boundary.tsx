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

import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import { isEmpty } from 'lodash'
import { Flex, Typography } from 'antd'

interface IErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
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
    console.log('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render (): ReactNode {
    const { children, fallback } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      if (!isEmpty(fallback)) return fallback

      return (
        <Flex
          align='center'
          gap={ 10 }
          justify='center'
          style={ { position: 'absolute', inset: 0 } }
        >
          <Typography>{error?.message ?? 'Something went wrong.'}</Typography>
        </Flex>
      )
    }

    return children
  }
}

export default ErrorBoundary
