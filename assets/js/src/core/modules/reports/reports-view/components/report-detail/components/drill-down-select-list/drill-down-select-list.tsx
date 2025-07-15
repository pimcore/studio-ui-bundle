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

interface IDrillDownSelectListProps {
  reportName: string
  drillDownFields: string[] | undefined
}

export const DrillDownSelectList = ({ reportName, drillDownFields }: IDrillDownSelectListProps): React.JSX.Element => {
  console.log('------>>>>> reportName', reportName)
  console.log('------>>>>> drillDownFields', drillDownFields)
  return <div>DrillDownSelectList</div>
}
