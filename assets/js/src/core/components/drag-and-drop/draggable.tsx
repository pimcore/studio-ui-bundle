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

import React, { Children, isValidElement, useMemo, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { type DragAndDropInfo } from './context-provider'
import { uuid } from '@Pimcore/utils/uuid'
import { GlobalStyle } from './draggable.styles'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface DraggableProps {
  children: React.ReactNode
  info: DragAndDropInfo
}

function Draggable (props: DraggableProps): React.JSX.Element {
  const [id] = useState(uuid())
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: props.info
  })

  const Child = Children.only(props.children)

  if (!isValidElement(Child)) {
    trackError(new GeneralError('Children must be a valid react component'))
    throw new Error('Invalid React child element.')
  }

  return useMemo(() => (
    <div
      ref={ setNodeRef }
      { ...listeners }
      { ...attributes }
    >
      <GlobalStyle />
      {props.children}
    </div>
  ), [props.children])
}

const DraggableMemo = React.memo(Draggable)

export { DraggableMemo as Draggable }
