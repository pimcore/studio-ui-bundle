/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'

@injectable()
export abstract class DynamicTypeDefinitionAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract readonly label: string

  abstract getElement ({ currentData, updateFormData }: IReportConfigurationSectionProps): ReactElement
}
