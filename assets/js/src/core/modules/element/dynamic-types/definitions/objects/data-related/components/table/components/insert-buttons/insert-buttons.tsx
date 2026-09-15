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
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { SplitButton } from '@Pimcore/components/split-button/split-button'
import { type TableInsertPosition } from '../../hooks/use-table-value'

export interface InsertButtonProps {
  // When false the button always inserts before the selected cell, which is the
  // behaviour the object table datatype has always had.
  allowInsertPosition: boolean
  hasSelection: boolean
  onInsert: (position?: TableInsertPosition) => void
}

interface PositionedInsertButtonProps extends InsertButtonProps {
  afterKey: string
  afterLabel: string
  beforeKey: string
  beforeLabel: string
  icon: string
  label: string
}

const PositionedInsertButton = ({
  afterKey,
  afterLabel,
  allowInsertPosition,
  beforeKey,
  beforeLabel,
  hasSelection,
  icon,
  label,
  onInsert
}: PositionedInsertButtonProps): React.JSX.Element => {
  if (!allowInsertPosition) {
    return (
      <IconTextButton
        icon={ { value: icon } }
        onClick={ () => { onInsert() } }
        type="default"
      >
        {label}
      </IconTextButton>
    )
  }

  return (
    <SplitButton
      icon={ { value: icon } }
      menu={ {
        items: [
          {
            key: beforeKey,
            label: beforeLabel,
            onClick: () => { onInsert('before') }
          },
          {
            key: afterKey,
            label: afterLabel,
            onClick: () => { onInsert('after') }
          }
        ]
      } }
      menuDisabled={ !hasSelection }
      onClick={ () => { onInsert('end') } }
      type="default"
    >
      {label}
    </SplitButton>
  )
}

export const NewRowButton = (props: InsertButtonProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <PositionedInsertButton
      { ...props }
      afterKey="insert-row-below"
      afterLabel={ t('table.insert-row-below') }
      beforeKey="insert-row-above"
      beforeLabel={ t('table.insert-row-above') }
      icon="new-row"
      label={ t('table.new-row') }
    />
  )
}

export const NewColumnButton = (props: InsertButtonProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <PositionedInsertButton
      { ...props }
      afterKey="insert-column-right"
      afterLabel={ t('table.insert-column-right') }
      beforeKey="insert-column-left"
      beforeLabel={ t('table.insert-column-left') }
      icon="new-column"
      label={ t('table.new-column') }
    />
  )
}
