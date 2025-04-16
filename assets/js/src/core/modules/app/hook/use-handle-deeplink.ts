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

import { isEmpty } from 'lodash'
import { useLocation } from 'react-router-dom'
import trackError, { GeneralError } from '../error-handler'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'

export const useHandleDeepLink = (): void => {
  const location = useLocation()
  const { openElement } = useElementHelper()

  if (location?.state?.isDeeplink === true) {
    const id = location?.state?.id
    const elementType = location?.state?.elementType

    const fetchData = async (): Promise<void> => {
      if (!isEmpty(id) && !isEmpty(elementType)) {
        await openElement({ id: Number(id), type: elementType as ElementType })
      }
    }

    fetchData()
      .catch(() => {
        trackError(new GeneralError('An Error occured while opening the Element'))
      })
  }
}
