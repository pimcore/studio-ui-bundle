/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useStyle } from '@Pimcore/components/element-toolbar/element-toolbar.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { Divider } from '@Pimcore/components/divider/divider'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { getElementDeeplink } from '@Pimcore/modules/element/element-helper'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from '../icon-button/icon-button'
import { useSystemInfoModal } from '@Pimcore/modules/element/components/system-info-modal/hooks/use-system-info-modal'

export const ElementToolbar = ({ id, elementType, editorTabsWidth }: { id: number, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const { t } = useTranslation()
  const elementRef = useRef<HTMLDivElement>(null)
  const { styles } = useStyle()
  const { element } = useElementDraft(id, elementType)
  const deeplinkUrl = getElementDeeplink(elementType, id)
  const [editorTabsBlockSize, setEditorTabsBlockSize] = useState<'S' | 'L' | null>(null)
  const [locateInTreeLoading, setLocateInTreeLoading] = useState<boolean>(false)
  const { locateInTree } = useLocateInTree(elementType)

  const { openModal } = useSystemInfoModal()

  useLayoutEffect(() => {
    if (editorTabsWidth == null) return

    editorTabsWidth <= 800 ? setEditorTabsBlockSize('S') : setEditorTabsBlockSize('L')
  }, [editorTabsWidth])

  if (element === undefined) {
    return <></>
  }

  const menuItems: DropdownMenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex justify="space-between">
          <Text>{t('element.toolbar.copy-id')}</Text>
          <Text
            className={ styles.dropdownInfoTextId }
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
    menuItems?.splice(0, 0, {
      key: '0',
      label: t('element.toolbar.copy-className', { className: element.className as string }),
      onClick: () => {
        void navigator.clipboard.writeText(
          element.className as string
        )
      }
    })
  }

  return (
    <div
      className={ styles.toolbar }
      ref={ elementRef }
    >

      <Breadcrumb
        editorTabsWidth={ editorTabsWidth }
        elementType={ elementType }
        pageSize={ editorTabsBlockSize }
        path={ element.fullPath! }
      />

      <div className={ styles.dropdownInfoWrapper }>
        <Dropdown
          menu={ { items: menuItems } }
          rootClassName={ styles.dropdownInfo }
        >
          <Button
            icon={
              <Icon
                value={ 'chevron-down' }
              />
            }
            iconPosition="end"
            onClick={ () => {
              void navigator.clipboard.writeText(
                element.id.toString()
              )
            } }
            size="small"
          >
            <Space>
              ID: {element.id}
            </Space>
          </Button>
        </Dropdown>
      </div>

      <IconButton
        icon={ { value: 'target' } }
        loading={ locateInTreeLoading }
        onClick={ () => {
          setLocateInTreeLoading(true)
          locateInTree(element.id, () => { setLocateInTreeLoading(false) })
        } }
      />
    </div>
  )
}
