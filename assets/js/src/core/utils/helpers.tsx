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

export function onKeyEnterExecuteClick (e: any): void {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.click()
  }
}

// TODO: Use _.isNil from Lodash instead of the custom implementation below
export function isSet (par: any): boolean {
  return par !== null && par !== undefined
}

export function respectLineBreak (text: string, useParagraph: boolean = true): React.JSX.Element {
  const trimmedText = text.replace(/\n+$/, '')
  const textSplit = trimmedText.split('\n')
  if (useParagraph) {
    return (
      <div>{textSplit.map((line, index) =>
        <p key={ `${index}-${line}` }>{line}</p>)}
      </div>
    )
  } else {
    return (
      <div>{textSplit.map((line, index, arr) => (
        <React.Fragment key={ index }>
          {line}
          {/* Do not add <br /> at the end */}
          {index < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
      </div>
    )
  }
}
