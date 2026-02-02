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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'

export interface ImageThumbnailsTreeToolbarProps {
  isFetching: boolean
  onAdd: () => void
  onRefresh: () => void
}

export const ImageThumbnailsTreeToolbar = ({
  isFetching,
  onAdd,
  onRefresh
}: ImageThumbnailsTreeToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Toolbar>
      <Flex
        gap="extra-small"
        justify="flex-end"
      >
        <IconButton
          disabled={ isFetching }
          icon={ { value: 'refresh' } }
          onClick={ onRefresh }
          size="small"
          title={ t('refresh') }
          type="text"
        />
        
        <IconButton
          icon={ { value: 'add' } }
          onClick={ onAdd }
          size="small" 
          title={ t('new') }
          type="text"
        />
      </Flex>
    </Toolbar>
  )
}
