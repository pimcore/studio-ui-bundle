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
import { DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'
import { SqlAdapter } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/components/sql-adapter/sql-adapter'

@injectable()
export class DynamicTypeCustomReportDefinitionSqlAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'sql'

  getLabel (): ReactElement {
    return <>Sql</>
  }

  getCustomReportData (props: any): ReactElement {
    return <SqlAdapter { ...props } />
  }
}
