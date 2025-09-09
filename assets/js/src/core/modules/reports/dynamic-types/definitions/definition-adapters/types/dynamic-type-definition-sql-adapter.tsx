/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { DynamicTypeDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/definition-adapters/dynamic-type-definition-abstract'
import { SqlAdapter } from '@Pimcore/modules/reports/dynamic-types/definitions/definition-adapters/components/sql-adapter/sql-adapter'

@injectable()
export class DynamicTypeDefinitionSqlAdapter extends DynamicTypeDefinitionAbstract {
  id = 'sql'
  label = 'Sql'

  getElement (props: IReportConfigurationSectionProps): ReactElement {
    return <SqlAdapter { ...props } />
  }
}
