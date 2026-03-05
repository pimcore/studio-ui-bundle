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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { IconTextButton } from '@sdk/components'

export interface VideoThumbnailsTreeToolbarProps {
  isFetching: boolean
  onAdd: () => void
  onRefresh: () => void
}

export const VideoThumbnailsTreeToolbar = ({
  isFetching,
  onAdd,
  onRefresh
}: VideoThumbnailsTreeToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Toolbar justify='space-between'>
      <Tooltip title={ t('refresh') }>
        <IconButton
          disabled={ isFetching }
          icon={ { value: 'refresh' } }
          onClick={ onRefresh }
          title={ t('refresh') }
          type="link"
        />
      </Tooltip>
      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ onAdd }
        type="link"
      >
        {t('new')}
      </IconTextButton>
    </Toolbar>
  )
}
