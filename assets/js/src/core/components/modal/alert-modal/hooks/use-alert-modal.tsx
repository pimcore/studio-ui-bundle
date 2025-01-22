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

import { App, type ModalFuncProps } from 'antd'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

interface ContentAware {
  content: string | React.ReactNode
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
      info: ({ content }) => (
        modal.info({
          title: t('info'),
          content
        })
      ),
      error: ({ content }) => (
        modal.error({
          title: t('error'),
          content
        })
      ),
      warn: ({ content }) => (
        modal.warning({
          title: t('warning'),
          content
        })
      ),
      success: ({ content }) => (
        modal.success({
          title: t('success'),
          content
        })
      )
    }),
    []
  )
}
