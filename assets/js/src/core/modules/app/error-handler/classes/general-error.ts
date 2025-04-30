/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'

class GeneralError extends Error {
  private readonly errorData: string

  constructor (message: string) {
    super()

    this.errorData = message
  }

  public getContent (): IErrorGetContent['data'] {
    return this.errorData
  }
}

export default GeneralError
