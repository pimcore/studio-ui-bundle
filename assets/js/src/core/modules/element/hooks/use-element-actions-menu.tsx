/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { App } from 'antd'
import type { DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { type Element, getElementDeeplink } from '@Pimcore/modules/element/element-helper'
import type { ElementType } from '@Pimcore/types/enums/element/element-type'
import { type ISystemInfoModalProps, SystemInfoModal } from '@Pimcore/modules/element/components/system-info-modal/system-info-modal'
import { copyToClipboard } from '@Pimcore/utils/clipboard'

export type IElement = Element & {
  fileSize: number
  mimeType: string | null
}

interface IUseElementActionsMenuProps {
  element?: IElement
  elementType: ElementType
}

interface IUseElementActionsMenuReturn {
  actionMenuItems: DropdownMenuProps['items']
}

export const useElementActionsMenu = ({ element, elementType }: IUseElementActionsMenuProps): IUseElementActionsMenuReturn => {
  const { t } = useTranslation()
  const { modal } = App.useApp()

  if (element === undefined) {
    return { actionMenuItems: [] }
  }

  const deeplinkUrl = getElementDeeplink(elementType, element.id)

  const showSystemInfoModal = (data: ISystemInfoModalProps['data']): void => {
    const modalInstance = modal.info({
      title: t('element.full-information'),
      content: (
        <SystemInfoModal
          data={ data }
          onClose={ () => { modalInstance.destroy() } }
        />
      ),
      icon: null,
      footer: null,
      closable: true
    })
  }

  const actionMenuItems: DropdownMenuProps['items'] = [
    {
      key: 'copy-id',
      label: (
        <Flex justify="space-between">
          <Text>{t('element.toolbar.copy-id')}</Text>
          <Text
            style={ { fontWeight: 'lighter' } }
            type="secondary"
          >{element.id}</Text>
        </Flex>
      ),
      onClick: (e) => {
        e.domEvent.stopPropagation()

        void copyToClipboard(element.id.toString())
      }
    },
    {
      key: 'copy-full-path',
      label: t('element.toolbar.copy-full-path-to-clipboard'),
      onClick: (e) => {
        e.domEvent.stopPropagation()

        void copyToClipboard(element.fullPath)
      }
    },
    {
      key: 'copy-deep-link',
      label: t('element.toolbar.copy-deep-link-to-clipboard'),
      onClick: (e) => {
        e.domEvent.stopPropagation()

        void copyToClipboard(deeplinkUrl)
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'show-full-info',
      label: (
        <Flex
          align="center"
          gap="extra-small"
        >
          <Icon value="info-circle" />
          <Text>{t('element.toolbar.show-full-info')}</Text>
        </Flex>
      ),
      onClick: (e) => {
        e.domEvent.stopPropagation()

        showSystemInfoModal({
          ...element,
          elementType,
          deeplink: deeplinkUrl
        })
      }
    }
  ]

  if (elementType === 'data-object' && 'className' in element) {
    actionMenuItems?.splice(0, 0, {
      key: 'copy-className',
      label: t('element.toolbar.copy-className', { className: element.className }),
      onClick: (e) => {
        e.domEvent.stopPropagation()

        void copyToClipboard(element.className)
      }
    })
  }

  return { actionMenuItems }
}
