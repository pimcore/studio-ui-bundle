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

import { type IconButtonProps } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import React from 'react'
import { type BlockItemProps } from './block-item'
import { type CollectionAddButtonProps } from '../collection/collection'
import { useTranslation } from 'react-i18next'

export interface BlockAddButtonProps extends CollectionAddButtonProps {
  operation: BlockItemProps['operation']
}

export const BlockAddButton = (props: BlockAddButtonProps): React.JSX.Element => {
  const { operation } = props
  const { t } = useTranslation()

  const onAddClick: IconButtonProps['onClick'] = (e): void => {
    e.stopPropagation()
    operation.add()
  }

  return (
    <IconTextButton
      disabled={ props.disallowAdd === true }
      icon={ { value: 'new' } }
      onClick={ onAddClick }
    >{t('add')}</IconTextButton>
  )
}
