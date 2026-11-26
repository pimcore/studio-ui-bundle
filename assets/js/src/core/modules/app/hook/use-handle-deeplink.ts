/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { USERPROFILE } from '@Pimcore/modules/auth/profile/profile-container'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { openMainWidget, selectWidgetManagerRestored } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { isEmpty, isNull, isUndefined } from 'lodash'
import { type TFunction } from 'i18next'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import trackError, { GeneralError, TrackedError } from '../error-handler'
import { type DeepLinkRegistryInterface } from '../deep-link-registry/deep-link-registry'
import { DEEP_LINK_HANDLER_PARAM } from '../deep-link-registry/deep-link-param'

const runDeepLinkHandler = async (name: string, params: URLSearchParams, t: TFunction): Promise<void> => {
  const handler = container.get<DeepLinkRegistryInterface>(serviceIds['App/DeepLinkRegistry/DeepLinkRegistry']).get(name)

  if (isUndefined(handler)) {
    trackError(new GeneralError(t('deep-link.unknown-link')))
    return
  }

  try {
    await handler.handle(params)
  } catch (error) {
    if (!(error instanceof TrackedError)) {
      trackError(new GeneralError(t('deep-link.open-failed')))
    }
  }
}

export const useHandleDeepLink = (): void => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { openElement } = useElementHelper()
  const dispatch = useAppDispatch()
  // restoring the widget layout from the previous session replaces the inner model,
  // so widgets must only be opened after the restore is done
  const isWidgetManagerRestored = useAppSelector(selectWidgetManagerRestored)
  const isLinkHandledRef = useRef(false)

  useEffect(() => {
    if (!isWidgetManagerRestored) {
      return
    }

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

    const linkName = searchParams.get(DEEP_LINK_HANDLER_PARAM)

    if (!isNull(linkName) && !isLinkHandledRef.current) {
      isLinkHandledRef.current = true

      runDeepLinkHandler(linkName, searchParams, t).catch(() => {
        // trackError re-throws GeneralError after showing it
      })

      // a reload must not open the link again
      void navigate(
        { pathname: location.pathname, search: '', hash: location.hash },
        { replace: true, state: location.state }
      )
    }
  }, [isWidgetManagerRestored])
}
