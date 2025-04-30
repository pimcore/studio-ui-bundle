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
import { Image, type ImageProps } from 'antd'
import { useStyle } from '@Pimcore/components/pimcore-image/pimcore-image.styles'

export const PimcoreImage = (props: ImageProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <Image
      className={ styles.image }
      preview={ false }
      { ...props }
    />
  )
}
