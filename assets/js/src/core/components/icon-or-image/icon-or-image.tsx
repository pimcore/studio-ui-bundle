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

import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import React from 'react'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from '@Pimcore/components/icon-or-image/icon-or-image.styles'

interface IconOrImageProps {
  class: string
  value: string | ElementIcon
  alt?: string
}

export const IconOrImage = (props: IconOrImageProps): React.JSX.Element => {
  const { styles } = useStyles()

  const renderPreview = (): React.JSX.Element => {
    if (typeof props.value === 'string') {
      return (
        <PimcoreImage
          alt={ props.alt }
          className={ props.class }
          src={ props.value }
        />
      )
    } else if (typeof props.value === 'object') {
      return (
        <Icon
          { ...props.value }
          className={ styles.icon }
          options={ { width: 50, height: 50 } }
        />
      )
    }

    return <></>
  }

  return renderPreview()
}
