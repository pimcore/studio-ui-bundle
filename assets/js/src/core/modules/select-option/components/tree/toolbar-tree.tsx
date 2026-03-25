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
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

interface IToolbarTreeProps {
  onReload: () => void
  onAddItem?: () => void
}

export const ToolbarTree = ({ onReload, onAddItem }: IToolbarTreeProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ToolbarView>
      <IconButton
        icon={ { value: 'refresh' } }
        onClick={ onReload }
      >
        {t('toolbar.reload')}
      </IconButton>

      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ onAddItem }
      >
        {t('toolbar.new')}
      </IconTextButton>
    </ToolbarView>
  )
}
