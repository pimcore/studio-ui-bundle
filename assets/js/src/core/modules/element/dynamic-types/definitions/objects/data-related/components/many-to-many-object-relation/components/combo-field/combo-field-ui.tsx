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
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './combo-field-ui.styles'

const SKELETON_ROW_KEYS = ['skeleton-0', 'skeleton-1', 'skeleton-2']

export const LoadingRows = (): React.JSX.Element => {
  const { styles } = useStyles()
  return (
    <>
      { SKELETON_ROW_KEYS.map(key => (
        <Flex
          align="center"
          className={ styles.loadingRow }
          key={ key }
        >
          <Skeleton.Input
            active
            block
            size="small"
          />
        </Flex>
      )) }
    </>
  )
}

interface DropdownFooterProps {
  loaded: number
  total: number | undefined
  allLoaded: boolean
  backgroundMode: boolean
}

export const DropdownFooter = ({ loaded, total, allLoaded, backgroundMode }: DropdownFooterProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  if (loaded === 0 || allLoaded || backgroundMode || total === undefined) return null
  return (
    <div className={ styles.dropdownFooter }>
      { t('pagination.showing-x-of-y', { loaded, total }) }
    </div>
  )
}
