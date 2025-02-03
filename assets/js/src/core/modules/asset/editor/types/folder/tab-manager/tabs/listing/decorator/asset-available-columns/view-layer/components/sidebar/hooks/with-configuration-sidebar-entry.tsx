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

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'

export const withConfigurationSidebarEntry = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  console.log('decorator called')
  const useSidebarEntry: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    console.log('decorated')

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()

      return {
        ...baseProps,
        entries: [
          ...baseProps.entries,
          {
            component: <>test</>,
            key: 'configuration',
            icon: <Icon value="settings" />
          }
        ]
      }
    }

    return {
      getProps
    }
  }

  return useSidebarEntry
}
