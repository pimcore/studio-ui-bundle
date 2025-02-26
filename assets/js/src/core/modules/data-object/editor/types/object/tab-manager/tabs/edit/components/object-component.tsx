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

import React, { useMemo } from 'react'
import { LayoutComponent, type LayoutComponentProps } from './layout-component'
import { DataComponent, type DataComponentProps } from './data-component'
import { type FormItemProps } from 'antd'

export interface ObjectComponentProps {
  name: FormItemProps['name']
  className?: string
  dataType?: string
  datatype?: string
  [p: string]: any
}

export const ObjectComponent = (props: ObjectComponentProps): React.JSX.Element => {
  const { dataType, datatype } = props

  const currentDataType = dataType ?? datatype

  const renderNode = useMemo(() => {
    if (currentDataType === 'data') {
      return <DataComponent { ...props as DataComponentProps } />
    }

    if (currentDataType === 'layout') {
      return <LayoutComponent { ...props as LayoutComponentProps } />
    }
  }, [currentDataType])

  if (renderNode === undefined) {
    throw new Error(`Unknown datatype: ${currentDataType}`)
  }

  return (
    <>
      { renderNode }
    </>
  )
}
