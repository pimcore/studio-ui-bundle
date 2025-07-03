/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useStyle } from '@Pimcore/components/element-toolbar/element-toolbar.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { getElementDeeplink } from '@Pimcore/modules/element/element-helper'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { Button, Space } from 'antd'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../icon-button/icon-button'

export const ElementToolbar = ({ id, elementType, editorTabsWidth }: { id: number, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const { t } = useTranslation()
  const elementRef = useRef<HTMLDivElement>(null)
  const { styles } = useStyle()
  const { element } = useElementDraft(id, elementType)
  const deeplinkUrl = getElementDeeplink(elementType, id)
  const [editorTabsBlockSize, setEditorTabsBlockSize] = useState<'S' | 'L' | null>(null)
  const [locateInTreeLoading, setLocateInTreeLoading] = useState<boolean>(false)
  const { locateInTree } = useLocateInTree(elementType)

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
      label: t('element.toolbar.copy-id', { id: element.id }),
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
      className={styles.toolbar}
      ref={elementRef}
    >

      <Breadcrumb
        editorTabsWidth={editorTabsWidth}
        elementType={elementType}
        pageSize={editorTabsBlockSize}
        path={element.fullPath!}
      />

      <div className={'element-toolbar__info-dropdown'}>
        <Dropdown menu={{ items: menuItems }}>
          <Button
            icon={
              <Icon
                value={'chevron-down'}
              />
            }
            iconPosition="end"
            onClick={() => {
              void navigator.clipboard.writeText(
                element.id.toString()
              )
            }}
            size="small"
          >
            <Space>
              ID: {element.id}
            </Space>
          </Button>
        </Dropdown>
      </div>

      <IconButton
        icon={{ value: 'target' }}
        loading={locateInTreeLoading}
        onClick={() => {
          setLocateInTreeLoading(true)
          locateInTree(element.id, () => { setLocateInTreeLoading(false) })
        }}
      />
    </div>
  )
}
