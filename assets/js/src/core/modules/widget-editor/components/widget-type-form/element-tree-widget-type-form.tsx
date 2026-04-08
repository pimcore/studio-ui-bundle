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
import { Form } from '@Pimcore/components/form/form'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { AllowedContextMenuPanel } from './components/allowed-context-menu-panel/allowed-context-menu-panel'
import { AllowedObjectsPanel } from './components/allowed-objects-panel/allowed-objects-panel'
import { FilterPanel } from './components/filter-panel/filter-panel'
import { SpecificPanel } from './components/specific-panel/specific-panel'

export const ElementTreeWidgetTypeForm = (): React.JSX.Element => {
  return (
    <>
      <SpecificPanel />
      <Form.Conditional
        condition={ (values) => values.elementType === elementTypes.dataObject }
        watchFields={ ['elementType'] }
      >
        <AllowedObjectsPanel />
      </Form.Conditional>
      <AllowedContextMenuPanel />
      <FilterPanel />
    </>
  )
}
