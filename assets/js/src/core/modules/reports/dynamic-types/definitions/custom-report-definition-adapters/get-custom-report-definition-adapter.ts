/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeCustomReportDefinitionRegistry } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry'
import { type DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'

export const getCustomReportDefinitionAdapter = (type: string | undefined, throwException: boolean = true): DynamicTypeCustomReportDefinitionAbstract | undefined => {
  if (isUndefined(type)) {
    return undefined
  }

  const registry = container.get<DynamicTypeCustomReportDefinitionRegistry>(serviceIds['DynamicTypes/CustomReportDefinitionRegistry'])

  return registry.getDynamicType(type, throwException) ?? undefined
}
