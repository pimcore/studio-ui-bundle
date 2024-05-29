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

import { Image, type ImageProps, Spin } from 'antd'
import React, { useContext } from 'react'
import { useStyle } from '@Pimcore/components/pimcore-image/pimcore-image.styles'
import { ZoomContext } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/preview-container'

interface PimcoreImageProps extends ImageProps {
}

export const PimcoreImage = (props: PimcoreImageProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { zoom } = useContext(ZoomContext)

  return (
    <Image
      className={ styles.image }
      placeholder={
        <div className={ styles['loading-div'] }>
          <Spin size="small" />
        </div>
          }
      preview={ false }
      style={ {
        transform: `scale(${zoom * 0.01})`
      } }
      { ...props }
    />
  )
}
