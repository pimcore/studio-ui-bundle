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
import { LayoutComponent, type LayoutComponentProps } from './layout-component'
import { DataComponent, type DataComponentProps } from './data-component'

export interface ObjectComponentProps {
  name: string
  datatype: string
  [p: string]: any
}

export const ObjectComponent = (props: ObjectComponentProps): React.JSX.Element => {
  const { datatype } = props

  if (datatype === 'data') {
    return <DataComponent { ...props as DataComponentProps } />
  }

  if (datatype === 'layout') {
    return <LayoutComponent { ...props as LayoutComponentProps } />
  }

  throw new Error(`Unknown datatype: ${datatype}`)
}
