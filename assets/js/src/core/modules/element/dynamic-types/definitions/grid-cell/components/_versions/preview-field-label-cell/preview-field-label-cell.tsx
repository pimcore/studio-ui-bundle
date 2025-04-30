/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Typography } from 'antd'
const { Text } = Typography

export interface PreviewFieldLabelCellValue {
  key: string
  field: string
  language: string | null | undefined
  metadataType: string | null | undefined
}

export const PreviewFieldLabelCell = (props: DefaultCellProps): React.JSX.Element => {
  const value = props.getValue() as PreviewFieldLabelCellValue

  if (value === undefined) {
    return <div></div>
  }

  return (
    <div className="default-cell__content">
      { value.field }
      { typeof value.metadataType === 'string' ? ` (${value.metadataType})` : '' }
      { typeof value.language === 'string' ? <Text type="secondary"> {value.language}</Text> : '' }
    </div>
  )
}
