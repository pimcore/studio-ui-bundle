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
import { moduleSystem, type AbstractModule } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type MetadataTypeRegistry } from './services/metadata-type-registry'
import { Input } from './metadata-types/input'
import { Textarea } from './metadata-types/textarea'
import { Asset } from './metadata-types/asset'
import { DataObject } from './metadata-types/data-object'
import { Document } from './metadata-types/document'
import { Date } from './metadata-types/date'
import { Select } from './metadata-types/select'
import { Checkbox } from './metadata-types/checkbox'

export const assetMetadataTypeProvider: AbstractModule = {
  onInit () {
    const metadataTypeRegistry = container.get<MetadataTypeRegistry>(serviceIds['Asset/MetadataTypeProvider/MetadataTypeRegistry'])

    metadataTypeRegistry.registerComponent('input', new Input())
    metadataTypeRegistry.registerComponent('textarea', new Textarea())
    metadataTypeRegistry.registerComponent('asset', new Asset())
    metadataTypeRegistry.registerComponent('object', new DataObject())
    metadataTypeRegistry.registerComponent('document', new Document())
    metadataTypeRegistry.registerComponent('date', new Date())
    metadataTypeRegistry.registerComponent('select', new Select())
    metadataTypeRegistry.registerComponent('checkbox', new Checkbox())
  }
}

moduleSystem.registerModule(assetMetadataTypeProvider)
