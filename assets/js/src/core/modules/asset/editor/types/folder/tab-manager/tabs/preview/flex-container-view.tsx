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

import React, { type ReactNode } from 'react'
import { useStyles } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/flex-container-view.styles'

interface FlexContainerProps {
  renderElements: ReactNode[]
  className?: string
}

const FlexContainerView = (props: FlexContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  return (
    <div className={ styles.flexContainer + ' ' + props.className ?? '' }>
      {props.renderElements}
    </div>
  )
}

export { FlexContainerView }
