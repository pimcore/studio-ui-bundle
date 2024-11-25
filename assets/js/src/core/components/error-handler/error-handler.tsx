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

import type React from 'react'
import { memo, useEffect } from 'react'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface ErrorHandlerProps {
  errorData: any
  clear: any
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ errorData, clear }) => {
  const modal = useAlertModal()

  useEffect(() => {
    if (!isEmptyValue(errorData)) {
      const message = 'data' in errorData ? errorData.data.message : errorData.message

      modal.error({ content: message })

      clear()
    }
  }, [errorData, modal])

  return null
}

const areEqual = (prevProps: ErrorHandlerProps, nextProps: ErrorHandlerProps): boolean => {
  return prevProps.errorData === nextProps.errorData
}

export default memo(ErrorHandler, areEqual)
