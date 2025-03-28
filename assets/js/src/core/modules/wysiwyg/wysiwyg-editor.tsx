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

import React, { forwardRef, type MutableRefObject, useEffect } from 'react'
import { type WysiwygProps } from './interface/wysiwyg'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ComponentRegistry } from '../app/component-registry/component-registry'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'
interface WysiwygEditorProps { editorProps: WysiwygProps }

export const WysiwygEditor = forwardRef(function WysiwygEditor (
  props: WysiwygEditorProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const WysiwygEditorComponent = componentRegistry.get<WysiwygProps>('wysiwygEditor')
  const { getStateClasses } = useDroppable()

  useEffect(() => {
    // Add any necessary effect logic here if required
  }, [props.editorProps])

  return (
    <div
      className={ cn(...getStateClasses()) }
      ref={ ref }
    >
      <WysiwygEditorComponent { ...props.editorProps } />
    </div>
  )
})

WysiwygEditor.displayName = 'WysiwygEditor'
export default WysiwygEditor
