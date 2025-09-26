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
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { useStyle } from '@Pimcore/components/element-toolbar/element-toolbar.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useElementActionsMenu } from '@Pimcore/components/hooks/use-element-actions-menu'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from '../icon-button/icon-button'

export const ElementToolbar = ({ id, elementType, editorTabsWidth }: { id: number, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const elementRef = useRef<HTMLDivElement>(null)
  const { styles } = useStyle()

  const { element } = useElementDraft(id, elementType)
  const [editorTabsBlockSize, setEditorTabsBlockSize] = useState<'S' | 'L' | null>(null)
  const [locateInTreeLoading, setLocateInTreeLoading] = useState<boolean>(false)
  const { locateInTree } = useLocateInTree(elementType)

  const { actionMenuItems: menuItems } = useElementActionsMenu({ element, elementType })

  useLayoutEffect(() => {
    if (editorTabsWidth == null) return

    editorTabsWidth <= 800 ? setEditorTabsBlockSize('S') : setEditorTabsBlockSize('L')
  }, [editorTabsWidth])

  if (element === undefined) {
    return <></>
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
