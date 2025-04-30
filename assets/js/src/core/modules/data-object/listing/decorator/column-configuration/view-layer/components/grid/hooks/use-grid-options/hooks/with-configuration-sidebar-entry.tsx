/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { Icon } from '@Pimcore/components/icon/icon'
import { GridConfig } from '../tabs/grid-config/grid-config'

export const withConfigurationSidebarEntry = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSidebarEntry: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { t } = useTranslation()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()

      return {
        ...baseProps,
        entries: [
          ...baseProps.entries,
          {
            component: <GridConfig />,
            key: 'configuration',
            icon: <Icon value="settings" />,
            tooltip: t('sidebar.grid_config')
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
