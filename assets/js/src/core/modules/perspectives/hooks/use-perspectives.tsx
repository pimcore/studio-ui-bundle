/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useAppDispatch } from '@sdk/app'
import { useUserUpdateActivePerspectiveMutation } from '@Pimcore/modules/user/user-api-slice.gen'
import { setActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { updateOuterModel } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { getInitialModelJson } from '@Pimcore/modules/widget-manager/utils/widget-manager-outer-model'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { api, type PerspectiveConfig } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import trackError, { ApiError } from '../../app/error-handler'
import { isPlainObject, isUndefined } from 'lodash'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'

export interface UsePerspectiveSwitcherReturn {
  switchPerspective: (perspective: PerspectiveConfig) => Promise<void>
  loadPerspective: (perspectiveId: string) => Promise<any>
  isLoading: boolean
}

export const usePerspectives = (): UsePerspectiveSwitcherReturn => {
  const dispatch = useAppDispatch()
  const user = useUser()
  const [updateActivePerspective] = useUserUpdateActivePerspectiveMutation()
  const [isLoading, setIsLoading] = useState(false)
  const { modal } = App.useApp()
  const { t } = useTranslation()

  const loadPerspective = async (perspectiveId: string): Promise<any> => {
    const perspectiveFetcher = dispatch(api.endpoints.perspectiveGetConfigById.initiate({ perspectiveId }))

    perspectiveFetcher
      .then(({ data, isSuccess, isError, error }) => {
        isError && trackError(new ApiError(error))

        if (isSuccess && isPlainObject(data)) {
          dispatch(setActivePerspective(data))
          dispatch(updateOuterModel(getInitialModelJson()))
        }
      })
      .catch(() => {})

    return await perspectiveFetcher
  }

  const switchPerspective = async (perspective: PerspectiveConfig): Promise<void> => {
    setIsLoading(true)
    const switchModal = modal.info({
      title: <Flex
        align="center"
        gap="small"
             >
        <Spin type="classic" />
        {t('perspective.switching.title')}
      </Flex>,
      content: <div>
        <Box margin={ { bottom: 'small' } }>
          {t('perspective.switching.description')}:
        </Box>
        <IconTextButton
          color="primary"
          icon={ perspective.icon }
          variant="filled"
        >
          {t(perspective.name)}
        </IconTextButton>
      </div>,
      footer: false
    })

    const perspectiveId = perspective.id
    const updateResult = await updateActivePerspective({ perspectiveId })
    if (!isUndefined(updateResult.error)) {
      trackError(new ApiError(updateResult.error))
    } else {
      await loadPerspective(perspectiveId)
      dispatch(setUser({ ...user, activePerspective: perspectiveId }))
    }

    setIsLoading(false)
    setTimeout(() => {
      switchModal.destroy()
    }, 500)
  }

  return { switchPerspective, loadPerspective, isLoading }
}
