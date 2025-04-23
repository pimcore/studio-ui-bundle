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

import React, { Children, isValidElement, type ReactNode, type RefCallback, useMemo, useState } from 'react'
import cn from 'classnames'
import { DroppableContextProvider } from '@Pimcore/components/drag-and-drop/droppable-context-provider'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useStyle } from './base-droppable.styles'
import { uuid } from '@Pimcore/utils/uuid'

export interface BaseDroppableProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean
  isValidData: boolean
  isOver: boolean
  setNodeRef: RefCallback<HTMLElement>
}

export const BaseDroppable = ({ children, className, variant, shape, isValidContext, isValidData, isOver, setNodeRef }: BaseDroppableProps): React.JSX.Element | null => {
  const { styles } = useStyle()
  const [id] = useState(uuid())
  const Child = Children.only(children)

  if (!isValidElement(Child)) {
    trackError(new GeneralError('Children must be a valid react component'))
    return null
  }

  const Component = Child.type

  if ('ref' in Child && Child.ref !== null) {
    const ref = Child.ref as React.MutableRefObject<HTMLElement>

    setNodeRef(ref.current)
  }

  return useMemo(() => (
    <div className={ cn(className, styles[variant ?? 'default'], shape !== 'angular' ? styles.round : undefined) }>
      <DroppableContextProvider value={ { isDragActive: isValidContext, isOver: isOver && isValidContext, isValid: isValidData && isValidContext } }>
        <Component
          { ...Child.props }
          key={ id }
          ref={ 'ref' in Child && Child.ref !== null ? Child.ref : setNodeRef }
        />
      </DroppableContextProvider>
    </div>
  ), [isOver, children, isValidContext, isValidData])
}
