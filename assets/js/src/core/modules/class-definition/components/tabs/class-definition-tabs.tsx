/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ClassDefinitionDetail } from '@Pimcore/modules/class-definition/components/detail/class-definition-detail'
import { useClassDefinitionTabs } from '@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider'
import { type ITabsProps, Tabs } from '@sdk/components'
import React from 'react'

export const ClassDefinitionTabs = (): React.JSX.Element => {
  const { classDefinitions, activeClassDefinition, setActiveClassDefinition, closeClassDefinition } = useClassDefinitionTabs()

  const items: ITabsProps['items'] = classDefinitions.map((classDef) => ({
    key: `${classDef.id}`,
    label: `${classDef.name} (ID: ${classDef.id})`,
    closable: true,
    children: (
      <ClassDefinitionDetail classDefinition={ classDef } />
    )
  }))

  return (
    <Tabs
      activeKey={ activeClassDefinition?.id ?? undefined }
      fullHeight
      items={ items }
      onChange={ (classDefinitionKey) => {
        const classDef = classDefinitions.find(cd => cd.id === classDefinitionKey)

        if (classDef !== undefined) {
          setActiveClassDefinition(classDef)
        }
      } }
      onClose={ (classDefinitionKey) => {
        const classDef = classDefinitions.find(cd => cd.id === classDefinitionKey)

        if (classDef !== undefined) {
          closeClassDefinition(classDef)
        }
      } }
    />
  )
}
