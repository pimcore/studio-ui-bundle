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
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { useStudioModal } from '@sdk/components'
import { Icon } from '@Pimcore/components/icon/icon'

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
      info: ({ title, content, icon, ...rest }) => (
        modal.info({
          title: !isUndefined(title) ? t(title) : t('info'),
          content,
          icon: icon ?? <Icon value='info' />,
          okText: t('alert-modal.ok-text'),
          ...rest
        })
      ),
      error: ({ title, content, icon, ...rest }) => (
        modal.error({
          title: !isUndefined(title) ? t(title) : t('error'),
          content,
          icon: icon ?? <Icon value='close-filled' />,
          okText: t('alert-modal.ok-text'),
          ...rest
        })
      ),
      warn: ({ title, content, icon, ...rest }) => (
        modal.warning({
          title: !isUndefined(title) ? t(title) : t('warning'),
          content,
          icon: icon ?? <Icon value='alert' />,
          okText: t('alert-modal.ok-text'),
          ...rest
        })
      ),
      success: ({ title, content, icon, ...rest }) => (
        modal.success({
          title: !isUndefined(title) ? t(title) : t('success'),
          content,
          icon: icon ?? <Icon value='checkmark' />,
          okText: t('alert-modal.ok-text'),
          ...rest
        })
      )
    }),
    []
  )
}
