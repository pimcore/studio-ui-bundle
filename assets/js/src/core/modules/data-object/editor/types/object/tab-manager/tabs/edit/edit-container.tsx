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
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { RootComponent } from './components/root-component'
import { useDataObjectGetByIdQuery, useDataObjectGetLayoutByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Content } from '@Pimcore/components/content/content'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useElementContext()
  const { data: layoutData, isLoading } = useDataObjectGetLayoutByIdQuery({ id })
  const { data, isLoading: isDataLoading } = useDataObjectGetByIdQuery({ id })

  if (layoutData === undefined || isLoading || isDataLoading) {
    return <Content loading />
  }

  return (
    <RootComponent
      data={ data?.objectData }
      layout={ layoutData }
    />
  )
}

export const TAB_EDIT: IEditorTab = {
  key: 'edit',
  label: 'Edit',
  children: <EditContainer />,
  icon: <Icon value={ 'edit' } />,
  isDetachable: true
}
