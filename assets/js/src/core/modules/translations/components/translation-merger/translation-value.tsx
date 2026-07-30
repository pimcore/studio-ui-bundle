/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Tooltip } from '@sdk/components'
import { useStyle } from './translation-value.styles'

interface TranslationValueProps {
  value: string
}

/**
 * Line breaks and tabs are preserved by the CSV export, but a table cell collapses them to a
 * single space — a multi-line value would look exactly like a flattened one. Render them as
 * visible markers and keep the untouched value in a tooltip.
 */
const WHITESPACE_PATTERN = /(\r\n|\n|\r|\t)/

const MARKERS: Record<string, string> = {
  '\r\n': '↵',
  '\n': '↵',
  '\r': '↵',
  '\t': '→'
}

export const TranslationValue = ({ value }: TranslationValueProps): React.JSX.Element => {
  const { styles } = useStyle()

  const segments = useMemo(() => {
    let offset = 0

    return value.split(WHITESPACE_PATTERN).map((segment) => {
      const start = offset
      offset += segment.length

      return { segment, start }
    })
  }, [value])

  const inline = (
    <span>
      {segments.map(({ segment, start }) => {
        const marker = MARKERS[segment]

        if (marker === undefined) {
          return segment
        }

        return (
          <span
            className={ styles.marker }
            key={ `${start}-${segment.length}` }
          >
            {marker}
          </span>
        )
      })}
    </span>
  )

  if (segments.length === 1) {
    return inline
  }

  return (
    <Tooltip title={ <span className={ styles.tooltip }>{value}</span> }>
      {inline}
    </Tooltip>
  )
}
