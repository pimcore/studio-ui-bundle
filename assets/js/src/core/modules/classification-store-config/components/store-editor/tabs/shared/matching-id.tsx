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
import { isNil } from 'lodash'
import { Text } from '@Pimcore/components/text/text'

interface IMatchingIdProps {
  identifier?: string | null
}

/** The generated identifier a configuration level is matched by, shown as plain text and never editable. */
export const MatchingId = ({ identifier }: IMatchingIdProps): React.JSX.Element => {
  if (isNil(identifier)) {
    return <></>
  }

  return (
    <Text>{identifier}</Text>
  )
}
