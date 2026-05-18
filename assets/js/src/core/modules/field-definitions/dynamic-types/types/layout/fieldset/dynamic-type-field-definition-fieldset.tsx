/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldDefinitionLayoutAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export class DynamicTypeFieldDefinitionFieldset extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'fieldset'

  getGroup (): string[] {
    return [...super.getGroup(), 'fieldset']
  }

  getIcon (): ElementIcon {
    return { type: 'name', value: 'fieldset' }
  }

  getSpecificSettingsPanel (): React.JSX.Element {
    return <></>
  }
}
