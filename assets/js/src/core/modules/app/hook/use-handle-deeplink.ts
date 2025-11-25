/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { USERPROFILE } from '@Pimcore/modules/auth/profile/profile-container'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { openMainWidget } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useAppDispatch } from '@sdk/app'
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router-dom'
import trackError, { GeneralError } from '../error-handler'

export const useHandleDeepLink = (): void => {
  const location = useLocation()
  const { openElement } = useElementHelper()
  const dispatch = useAppDispatch()

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

  if (location?.state?.resetPassword === true) {
    dispatch(openMainWidget({
      ...USERPROFILE,
      config: {
        ...USERPROFILE.config,
        resetPassword: true
      }
    }))
  }
}
