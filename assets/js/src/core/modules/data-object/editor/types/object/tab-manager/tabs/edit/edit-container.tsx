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
import { FieldCollectionProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider'
import { useStyles } from './edit-container.styles'
import { ObjectBrickProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/object-brick/providers/object-brick-provider'
import {
  useLayoutSelection
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useElementContext()
  const { currentLayout } = useLayoutSelection()

  const { data: layoutData, isLoading, error: layoutError } = useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined })
  const { data, isLoading: isDataLoading, error: dataObjectError } = useDataObjectGetByIdQuery({ id })

  const { styles } = useStyles()

  if (dataObjectError !== undefined) {
    trackError(new ApiError(dataObjectError))
  }
  if (layoutError !== undefined) {
    trackError(new ApiError(layoutError))
  }

  if (layoutData === undefined || isLoading || isDataLoading) {
    return <Content loading />
  }

  return (
    <FieldCollectionProvider>
      <ObjectBrickProvider>
        <RootComponent
          className={ styles.editContainer }
          data={ data?.objectData }
          layout={ layoutData }
        />
      </ObjectBrickProvider>
    </FieldCollectionProvider>
  )
}

export const TAB_EDIT: IEditorTab = {
  key: 'edit',
  label: 'Edit',
  children: <EditContainer />,
  icon: <Icon value={ 'edit-pen' } />,
  isDetachable: true
}
