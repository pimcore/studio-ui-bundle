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

import { isUndefined } from 'lodash'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import { GeneralError } from '@Pimcore/modules/app/error-handler/index'

interface IErrorContentProvider {
  getContent: () => string
}

type ErrorHandler = (data: string) => void

const isGeneralError = (error: any): boolean => error instanceof GeneralError

const trackError = (data: IErrorContentProvider, handler?: ErrorHandler): never | void => {
  const errorContent = data.getContent()

  if (!isUndefined(handler)) {
    handler(errorContent)
  } else {
    // Default handler
    ErrorModalService.showError(errorContent)
  }

  if (isGeneralError(data)) {
    throw new Error(errorContent)
  }
}

export default trackError
