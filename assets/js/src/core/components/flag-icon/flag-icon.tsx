/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import UnknownFlag from '@Pimcore/assets/images/flags/_unknown.inline.svg?react'

interface IFlagIconProps {
  value: string | null
  width?: number
  height?: number
}

// Create a context for all SVGs in the given directory
const flagsContext = require.context('@Pimcore/assets/images/flags', false, /\.svg$/)

// Create a mapping from file names to imported SVG modules
const flagComponents = flagsContext.keys().reduce((acc, key) => {
  const countryCode = key.replace('./', '').replace('.inline.svg', '')
  acc[countryCode] = flagsContext(key).default
  return acc
}, {})

export const FlagIcon = ({ value, width = 21, height = 15 }: IFlagIconProps): React.JSX.Element => {
  const FlagComponent = flagComponents[value ?? '_unknown']

  if (FlagComponent === undefined || FlagComponent === null) {
    return <UnknownFlag style={ { width: '100%', height: '100%' } } />
  }

  return (
    <FlagComponent
      height={ height }
      width={ width }
    />
  )
}
