/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo } from 'react'
import { VariantsContainer } from './variants-container'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { Icon } from '@Pimcore/components/icon/icon'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { componentConfig, ComponentRenderer } from '@sdk/modules/app'

export const VariantsTabContainer = (): React.JSX.Element => {
  const { setHasLocalizedFields } = useLanguageSelection()

  useEffect(() => {
    setHasLocalizedFields(true)
  }, [setHasLocalizedFields])

  return useMemo(() => <VariantsContainer />, [])
}

export const TAB_VARIANTS: IEditorTab = {
  key: 'variants',
  label: 'data-object.object-editor-tabs.variants',
  icon: <Icon value="data-object-variant" />,
  children: <ComponentRenderer component={ componentConfig.dataObject.editor.tab.variants.name } />,
  hidden: (elementApi) => !('allowVariants' in elementApi && elementApi?.allowVariants === true)
}
