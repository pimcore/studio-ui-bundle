/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ModalFuncProps } from 'antd'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { useStudioModal } from '@sdk/components'

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

interface IAlertModalProps extends Omit<ModalFuncProps, 'content' | 'title'> {
  content: string | React.ReactNode
  title?: string
}

export interface UseAlertModalResponse {
  info: (props: IAlertModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  error: (props: IAlertModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  warn: (props: IAlertModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  success: (props: IAlertModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export const useAlertModal = (): UseAlertModalResponse => {
  const { modal } = useStudioModal()
  const { t } = useTranslation()

  return useMemo<UseAlertModalResponse>(
    () => ({
      info: ({ title, content, ...rest }) => (
        modal.info({
          title: !isUndefined(title) ? t(title) : t('info'),
          content,
          ...rest
        })
      ),
      error: ({ title, content, ...rest }) => {
        return (
          modal.error({
            title: !isUndefined(title) ? t(title) : t('error'),
            content,
            ...rest
          })
        )
      },
      warn: ({ title, content, ...rest }) => (
        modal.warning({
          title: !isUndefined(title) ? t(title) : t('warning'),
          content,
          ...rest
        })
      ),
      success: ({ title, content, ...rest }) => (
        modal.success({
          title: !isUndefined(title) ? t(title) : t('success'),
          content,
          ...rest
        })
      )
    }),
    []
  )
}
