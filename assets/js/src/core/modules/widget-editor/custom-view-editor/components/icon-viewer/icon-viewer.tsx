/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyles } from './icon-viewer.styles'
import { Flex } from '@Pimcore/components/flex/flex'
import { isUndefined } from 'lodash'

interface IconViewerProps {
  value: string | undefined
}

export const IconViewer = ({ value }: IconViewerProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      align="center"
      className={ styles.iconViewer }
      justify="center"
    >
      {isUndefined(value) ? <div></div> : <Icon value={ value } />}
    </Flex>
  )
}
