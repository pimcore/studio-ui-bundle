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

import React, { type ReactNode } from 'react'
import { isUndefined } from 'lodash'
import { LayoutComponent, type LayoutComponentProps } from './layout-component'
import { DataComponent, type DataComponentProps } from './data-component'
import { DataComponent as VersionDataComponent } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component'
import { type FormItemProps } from 'antd'

export interface ObjectComponentProps {
  name: FormItemProps['name']
  className?: string
  dataType?: string
  datatype?: string
  isVersionObjectDataComponent?: boolean
  title?: ReactNode
  [p: string]: any
}

export const ObjectComponent = (props: ObjectComponentProps): React.JSX.Element => {
  const { dataType, datatype, isVersionObjectDataComponent } = props

  const currentDataType = dataType ?? datatype

  if (currentDataType === 'data') {
    if (isVersionObjectDataComponent === true) {
      return (
        <>
          {!isUndefined(props.title) && props.title }
          <VersionDataComponent { ...props as any } /></>
      )
    }

    return <DataComponent { ...props as DataComponentProps } />
  }

  if (currentDataType === 'layout') {
    return <LayoutComponent { ...props as LayoutComponentProps } />
  }

  throw new Error(`Unknown datatype: ${currentDataType}`)
}
