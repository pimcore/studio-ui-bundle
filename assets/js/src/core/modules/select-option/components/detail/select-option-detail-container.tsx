/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Tabs } from '@sdk/components'
import React from 'react'
import { useSelectOptionEditorContext } from '../../context/hooks/use-select-option-editor-context'
import { SelectOptionDetailTab } from './select-option-detail-tab'

export const SelectOptionDetailContainer = (): React.JSX.Element => {
  const { selectOptions, activeTabId, setActiveTabId, closeSelectOption } = useSelectOptionEditorContext()

  return (
    <Tabs
      activeKey={ activeTabId }
      fullHeight
      items={ selectOptions.map((selectOption) => ({
        key: selectOption.id,
        label: selectOption.id,
        children: <SelectOptionDetailTab id={ selectOption.id } />
      })) }
      onChange={ (key) => {
        setActiveTabId(key)
      } }
      onClose={ (key) => {
        closeSelectOption(key as string)
      } }
    />
  )
}
