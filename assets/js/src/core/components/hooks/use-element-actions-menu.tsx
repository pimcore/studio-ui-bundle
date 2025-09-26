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
import type { DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { getElementDeeplink } from '@Pimcore/modules/element/element-helper'
import type { ElementType } from '@Pimcore/types/enums/element/element-type'
import { useSystemInfoModal } from '@Pimcore/modules/element/components/system-info-modal/hooks/use-system-info-modal'

interface IUseElementActionsMenuProps {
  id: number
  elementType: ElementType
}

interface IUseElementActionsMenuReturn {
  actionMenuItems: DropdownMenuProps['items']
}

export const useElementActionsMenu = ({ id, elementType }: IUseElementActionsMenuProps): IUseElementActionsMenuReturn => {
  const { t } = useTranslation()

  const { element } = useElementDraft(id, elementType)
  const deeplinkUrl = getElementDeeplink(elementType, id)

  const { openModal } = useSystemInfoModal()

  if (element === undefined) {
    return { actionMenuItems: [] }
  }

  const actionMenuItems: DropdownMenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex justify="space-between">
          <Text>{t('element.toolbar.copy-id')}</Text>
          <Text
            style={ { fontWeight: 'lighter' } }
            type="secondary"
          >{element.id}</Text>
        </Flex>
      ),
      onClick: () => {
        void navigator.clipboard.writeText(
          element.id.toString()
        )
      }
    },
    {
      key: '2',
      label: t('element.toolbar.copy-full-path-to-clipboard'),
      onClick: () => {
        void navigator.clipboard.writeText(
          element.fullPath!
        )
      }
    },
    {
      key: '3',
      label: t('element.toolbar.copy-deep-link-to-clipboard'),
      onClick: () => {
        void navigator.clipboard.writeText(deeplinkUrl)
      }
    },
    {
      type: 'divider'
    },
    {
      key: '5',
      label: (
        <Flex
          align="center"
          gap="extra-small"
        >
          <Icon value="info-circle" />
          <Text>{t('element.toolbar.show-full-info')}</Text>
        </Flex>
      ),
      onClick: () => { openModal() }
    }
  ]

  if (elementType === 'data-object' && 'className' in element) {
    actionMenuItems?.splice(0, 0, {
      key: '0',
      label: t('element.toolbar.copy-className', { className: element.className as string }),
      onClick: () => {
        void navigator.clipboard.writeText(
          element.className as string
        )
      }
    })
  }

  return { actionMenuItems }
}
