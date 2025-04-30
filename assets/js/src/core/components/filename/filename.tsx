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
import { Text } from '../text/text'
import { Flex } from '../flex/flex'

export interface FilenameProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  ellipsis?: boolean
}

export const Filename = ({ value, ellipsis, ...props }: FilenameProps): React.JSX.Element => {
  const filename = value
  const hasExtension = filename.includes('.')

  if (hasExtension && ellipsis === true) {
    const parts = filename.split('.')
    const extension = parts.pop()
    const name = parts.join('.')

    return (
      <Flex { ...props }>
        <Text
          ellipsis={ ellipsis ? { tooltip: { title: filename, overlayStyle: { maxWidth: 'min(100%, 500px)' }, mouseEnterDelay: 0.3 } } : false }
          style={ { color: 'inherit' } }
        >{name}</Text>.
        <Text style={ { whiteSpace: 'nowrap', color: 'inherit' } }>{extension}</Text>
      </Flex>
    )
  }

  return (
    <Text
      ellipsis={ ellipsis }
      { ...props }
    >{ filename }</Text>
  )
}
