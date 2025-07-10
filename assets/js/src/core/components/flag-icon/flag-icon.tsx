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
import UnknownFlag from '@Pimcore/assets/images/flags/_unknown.inline.svg?react'

interface IFlagIconProps {
  value: string | null
  width?: number
  height?: number
}

const importFlag = async (countryCode: string): Promise<React.ReactElement | null> => {
  try {
    const module = await import(`@Pimcore/assets/images/flags/${countryCode}.inline.svg?react`)
    return module.default || module
  } catch {
    return null
  }
}

const flagCache: Record<string, React.ReactElement | null> = {}

export const FlagIcon = ({ value, width = 21, height = 15 }: IFlagIconProps): React.JSX.Element => {
  const [flag, setFlag] = React.useState<React.ReactElement | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const countryCode = value ?? '_unknown'
    
    if (flagCache[countryCode] !== undefined) {
      setFlag(flagCache[countryCode])
      setLoading(false)
      return
    }

    importFlag(countryCode).then(component => {
      flagCache[countryCode] = component
      setFlag(component)
      setLoading(false)
    })
  }, [value])

  if (loading) return <div style={{ width, height, background: '#f0f0f0' }} />
  
  if (!flag || !React.isValidElement(flag)) {
    return <UnknownFlag style={{ width, height }} />
  }

  return React.cloneElement(flag, { 
    style: { width, height },
    width: width.toString(), 
    height: height.toString() 
  } as any)
}
