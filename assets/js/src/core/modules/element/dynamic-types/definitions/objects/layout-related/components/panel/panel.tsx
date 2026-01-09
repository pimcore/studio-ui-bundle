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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Panel as CorePanel } from '@Pimcore/components/panel/panel'
import { useTranslation } from 'react-i18next'
import { isNonEmptyString } from '@sdk/utils'

export interface PanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  theme?: 'fieldset' | 'card-with-highlight'
}

export const Panel = ({ children, name, border, collapsed, collapsible, title, theme = 'card-with-highlight', noteditable, ...props }: PanelProps): React.JSX.Element => {
  const isMainPanel = name === 'pimcore_root'
  const isParentNotEditable = noteditable === true
  const { t } = useTranslation()

  return (
    <CorePanel
      border={ border }
      collapsed={ collapsed }
      collapsible={ collapsible }
      name={ name }
      theme={ theme }
      title={ isNonEmptyString(title) ? t(title) : title }
    >
      {children.map((child, index) => (
        <ObjectComponent
          { ...getChildProperties(child, isMainPanel) }
          key={ index }
          noteditable={ isParentNotEditable || child.noteditable }
        />
      ))}
    </CorePanel>
  )

  function getChildProperties (child: AbstractObjectLayoutDefinition, isMainPanel: boolean): AbstractObjectLayoutDefinition {
    const isTabpanelChild = child.fieldType === 'tabpanel' || child.fieldtype === 'tabpanel'

    const newChildProps = { ...child }

    if (isTabpanelChild && isMainPanel) {
      newChildProps.hasStickyHeader = true
    }

    return newChildProps
  }
}
