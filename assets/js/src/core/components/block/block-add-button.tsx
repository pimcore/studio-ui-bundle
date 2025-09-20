/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IconButtonProps } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'

export const BlockAddButton = (): React.JSX.Element => {
  const { operations } = useNumberedList()
  const { t } = useTranslation()

  const onAddClick: IconButtonProps['onClick'] = (e): void => {
    e.stopPropagation()
    operations.add({})
  }

  return (
    <IconTextButton
      icon={ { value: 'new' } }
      onClick={ onAddClick }
    >{t('add')}</IconTextButton>
  )
}
