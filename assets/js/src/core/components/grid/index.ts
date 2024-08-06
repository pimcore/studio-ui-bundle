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

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type TypeRegistry } from './services/type-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { TextCell } from './columns/types/text/text-cell'
import { DateCell } from './columns/types/date/date-cell'
import { CheckboxCell } from '@Pimcore/components/grid/columns/types/checkbox/checkbox-cell'
import { TimeCell } from '@Pimcore/components/grid/columns/types/time/time-cell'
import { OpenElementCell } from '@Pimcore/components/grid/columns/types/open-element/open-element-cell'
import { SelectCell } from './columns/types/select/select-cell'
import {
  TypeDependentContent
} from '@Pimcore/components/grid/columns/types/type-dependent-content/type-dependent-content'
import { LanguageCell } from '@Pimcore/components/grid/columns/types/language-select/language-cell'

moduleSystem.registerModule({
  onInit () {
    const typeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])

    typeRegistry.registerType({
      type: 'text',
      component: TextCell,

      copyHandler: (event, config) => {
        event.clipboardData!.setData('text/plain', config.getValue<string>())

        return true
      },

      pasteHandler: (event, config) => {
        const value = event.clipboardData!.getData('text/plain')

        if (config.table.options.meta?.onUpdateCellData !== undefined) {
          config.table.options.meta.onUpdateCellData({
            rowIndex: parseInt(config.row.id),
            columnId: config.column.id,
            value,
            rowData: config.row.original
          })
        }
      }
    })

    typeRegistry.registerType({
      type: 'type-dependent-content',
      component: TypeDependentContent
    })

    typeRegistry.registerType({
      type: 'language-select',
      component: LanguageCell
    })

    typeRegistry.registerType({
      type: 'date',
      component: DateCell
    })

    typeRegistry.registerType({
      type: 'datetime',
      component: DateCell
    })

    typeRegistry.registerType({
      type: 'time',
      component: TimeCell
    })

    typeRegistry.registerType({
      type: 'select',
      component: SelectCell
    })

    typeRegistry.registerType({
      type: 'checkbox',
      component: CheckboxCell
    })

    typeRegistry.registerType({
      type: 'open-element',
      component: OpenElementCell
    })
  }
})
