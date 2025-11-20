/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { usePerspectiveWidgetGetConfigCollectionQuery, type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { type DynamicTypeWidgetTypeRegistry } from '@Pimcore/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetConfiguratorContext } from '../../context/hooks/use-widget-configurator-context'

export const AddWidgetDropdown = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { onAdd } = useWidgetConfiguratorContext()
  const dynamicType = container.get<DynamicTypeWidgetTypeRegistry>(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry'])
  const { data: widgets, isFetching } = usePerspectiveWidgetGetConfigCollectionQuery({ skipWrapperWidgets: false })

  const handleWidgetClick = (widget: WidgetConfig): void => {
    onAdd?.(widget)
  }

  const menu: DropdownProps['menu']['items'] = [
    ...dynamicType.getMenuItems(widgets?.items ?? [], handleWidgetClick)
  ]

  return (
    <Dropdown
      menu={ {
        items: menu
      } }
    >
      <Button
        loading={ isFetching }
        type="default"
      >
        {t('add')}
      </Button>
    </Dropdown>
  )
}
