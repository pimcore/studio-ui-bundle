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
import { theme } from 'antd'
import { Text } from '@Pimcore/components/text/text'

interface IMatchingIdProps {
  identifier?: string | null
  /**
   * Align the value with the text of the inputs above it. A vertical Form.Item gives every control
   * the same left edge, but an Input draws its text one control padding inside that edge while a
   * bare Text starts on it, so the value reads as shifted left. Off for inline use beside a label.
   */
  alignWithInputText?: boolean
}

/** The generated identifier a configuration level is matched by, shown as plain text and never editable. */
export const MatchingId = ({ identifier, alignWithInputText = false }: IMatchingIdProps): React.JSX.Element => {
  const { token } = theme.useToken()

  if (isNil(identifier)) {
    return <></>
  }

  if (!alignWithInputText) {
    return <Text>{identifier}</Text>
  }

  return (
    <span style={ { paddingInlineStart: token.controlPaddingHorizontal - token.lineWidth } }>
      <Text>{identifier}</Text>
    </span>
  )
}
