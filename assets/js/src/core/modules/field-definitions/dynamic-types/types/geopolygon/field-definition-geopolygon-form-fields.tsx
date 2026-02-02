/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FieldDefinitionGeoSettings } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-geo-settings/field-definition-geo-settings'
import React from 'react'

export const FieldDefinitionGeopolygonFormFields = (): React.JSX.Element => {
  return (
    <FieldDefinitionGeoSettings />
  )
}
