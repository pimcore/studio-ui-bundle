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

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

export const staticAvailableColumns: AvailableColumn[] = [
  {
    config: [],
    key: 'id',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.id',
    frontendType: 'id',
    filterable: true
  },
  {
    config: [],
    key: 'type',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.string',
    frontendType: 'input',
    filterable: false
  },
  {
    config: [],
    key: 'fullpath',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.string',
    frontendType: 'asset-link',
    filterable: true
  },
  {
    config: [],
    key: 'key',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.string',
    frontendType: 'input',
    filterable: true
  },
  {
    config: [],
    key: 'published',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.boolean',
    frontendType: 'boolean',
    filterable: true
  },
  {
    config: [],
    key: 'classname',
    group: 'system',
    sortable: true,
    editable: false,
    exportable: true,
    localizable: false,
    locale: null,
    type: 'system.string',
    frontendType: 'input',
    filterable: true
  }
]
