/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { App, type ModalFuncProps } from 'antd'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

interface ContentAware {
  content: string | React.ReactNode
  title?: string
}

export interface UseAlertModalResponse {
  info: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  error: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  warn: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  success: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export const useAlertModal = (): UseAlertModalResponse => {
  const { modal } = App.useApp()

  const { t } = useTranslation()

  return useMemo<UseAlertModalResponse>(
    () => ({
      info: ({ title, content }) => (
        modal.info({
          title: !isUndefined(title) ? t(title) : t('info'),
          content
        })
      ),
      error: ({ title, content }) => {
        return (
          modal.error({
            title: !isUndefined(title) ? t(title) : t('error'),
            content
          })
        )
      },
      warn: ({ title, content }) => (
        modal.warning({
          title: !isUndefined(title) ? t(title) : t('warning'),
          content
        })
      ),
      success: ({ title, content }) => (
        modal.success({
          title: !isUndefined(title) ? t(title) : t('success'),
          content
        })
      )
    }),
    []
  )
}
