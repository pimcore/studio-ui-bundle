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
import { Space } from '@Pimcore/components/space/space'
import { type CollectionContentBaseProps } from '../collection-content'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'
import { CollectionContentEmpty } from '../collection-content-empty'
import { BaseView } from '../../../../../layout-related/views/base-view'
import cn from 'classnames'
import { useInheritanceOverlayStyle } from '@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style'

export interface CollectionContentListProps extends CollectionContentBaseProps {}

export const CollectionContentList = (props: CollectionContentListProps): React.JSX.Element => {
  const { itemComponent, ...baseItemProps } = props
  const [ItemComponent, additionalItemProps] = itemComponent

  const { fields } = props
  const hasFields = fields.length > 0
  const previousFields = usePrevious(props.fields)
  const hasFirstFieldAdded = previousFields?.length === undefined ? false : (previousFields.length) === 0 && hasFields
  const collapsed = hasFirstFieldAdded ? false : props.collapsed
  const inheritanceOverlayStyle = useInheritanceOverlayStyle({ inherited: props.inherited, type: 'wrapper' })

  const itemProps = {
    ...baseItemProps,
    ...additionalItemProps,
    ...{
      collapsed
    }
  }

  if (!hasFields) {
    return <CollectionContentEmpty { ...props } />
  }

  return (
    <BaseView
      border={ props.border }
      collapsed={ collapsed }
      collapsible={ props.collapsible }
      contentPadding={ props.border === true ? { x: 'none', top: 'small', bottom: 'none' } : 'small' }
      extra={ props.extra }
      extraPosition={ props.extraPosition }
      theme='default'
      title={ props.title }
    >
      <Space
        className={ cn('w-full', inheritanceOverlayStyle) }
        direction="vertical"
        size={ 'small' }
      >
        { props.fields.map((field) => {
          return (
            <ItemComponent
              field={ field }
              key={ field.name }
              { ...itemProps }
            />
          )
        }) }
      </Space>
    </BaseView>
  )
}
