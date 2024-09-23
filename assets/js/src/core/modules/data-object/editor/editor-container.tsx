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

import React, { useEffect } from 'react'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { DataObjectProvider } from '../data-object-provider'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry } from '@Pimcore/modules/element/editor/services/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { Content } from '@Pimcore/components/content/content'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, dataObject, removeDataObjectFromState } = useDataObjectDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalDataObjectContext()
  const componentRegistryService = useInjection<ComponentRegistry>(serviceIds['DataObject/Editor/ComponentRegistry'])

  useEffect(() => {
    return () => {
      removeContext()
      removeDataObjectFromState()
    }
  }, [])

  useEffect(() => {
    if (isWidgetActive) {
      setContext({ id })
    }

    return () => {
      if (!isWidgetActive) {
        removeContext()
      }
    }
  }, [isWidgetActive])

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <Content loading />
  }

  if (dataObject === undefined) {
    return <></>
  }

  let definition = componentRegistryService.getComponent(dataObject.type!)
  console.log('def', definition)
  if (definition === undefined) {
    definition = componentRegistryService.getComponent('object')!
  }

  const Component = definition.component

  return (
    <DataObjectProvider id={ id }>
      <Component />
    </DataObjectProvider>
  )
}

export { EditorContainer }
