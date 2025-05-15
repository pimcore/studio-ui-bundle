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
import { componentConfig, ComponentRenderer } from '../../../app/component-registry/component-registry'

export interface EditorContainerProps {
  id: number
}

const EditorContainerRenderer = (props: EditorContainerProps): React.JSX.Element => {
  return (
    <ComponentRenderer
      component={ componentConfig.asset.editor.container.name }
      props={ props }
    />
  )
}

export { EditorContainerRenderer }
