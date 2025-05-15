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
import { formatDateTime } from '@Pimcore/utils/date-time'

interface FormattedDateProps {
  timestamp: number
}

const FormattedDateTime = (props: FormattedDateProps): React.JSX.Element => {
  return (
    <>
      {formatDateTime({ timestamp: props.timestamp, dateStyle: 'short', timeStyle: 'short' })}
    </>
  )
}

export { FormattedDateTime }
