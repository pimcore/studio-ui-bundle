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

import React, { useEffect } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface ImageFooterProps {
  value?: string
  onChange?: (value?: string) => void
  disabled?: boolean
}

export const ImageFooter = (props: ImageFooterProps): React.JSX.Element => {
  const [value, setValue] = React.useState<string | undefined>(props.value)

  const emptyValue = (): void => {
    setValue(undefined)
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <IconButton
      disabled={ props.disabled }
      icon={ { value: 'delete-outlined' } }
      onClick={ emptyValue }
    />
  )
}
