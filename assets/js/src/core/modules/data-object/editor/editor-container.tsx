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

import React from 'react'
import {
  EditorContainerInner,
  type EditorContainerInnerProps
} from '@Pimcore/modules/data-object/editor/editor-container/editor-container-inner'
import { useCustomLayouts } from '@Pimcore/modules/data-object/hooks/use-custom-layouts'
import {
  LayoutSelectionProvider
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider'

export interface EditorContainerProps extends EditorContainerInnerProps {}

const EditorContainer = ({ id }: EditorContainerInnerProps): React.JSX.Element => {
  const { getDefaultLayoutId, isLoading } = useCustomLayouts(id)

  return (
    <LayoutSelectionProvider
      defaultLayout={ getDefaultLayoutId() }
      isLoading={ isLoading }
    >
      <EditorContainerInner
        id={ id }
      />
    </LayoutSelectionProvider>
  )
}

export { EditorContainer }
