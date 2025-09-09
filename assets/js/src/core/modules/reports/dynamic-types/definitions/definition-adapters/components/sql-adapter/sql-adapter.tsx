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
import type { IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { FormKit } from '@Pimcore/components/form/form-kit'

export const SqlAdapter = (props: IReportConfigurationSectionProps): React.JSX.Element => {
  return (
    <FormKit.Panel
      border
      theme="fieldset"
      title="Sql"
    >
      SQL Adapter...
    </FormKit.Panel>
  )
}
