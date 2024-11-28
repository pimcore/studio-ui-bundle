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

import React, { type ReactNode } from 'react'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

interface ErrorBoundaryWithAlertProps {
  children: ReactNode
}

export const ErrorBoundaryWithAlert = ({ children }: ErrorBoundaryWithAlertProps): React.JSX.Element => {
  const alertModal = useAlertModal()

  return (
    <ErrorBoundary
      showAlert={ (content: string | ReactNode) => alertModal.error({ content }) }
    >
      {children}
    </ErrorBoundary>
  )
}
