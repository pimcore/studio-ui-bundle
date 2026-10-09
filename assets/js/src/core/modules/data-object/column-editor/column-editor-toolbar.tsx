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
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'

export interface ColumnEditorToolbarProps {
  /** Renders the "Add column" / "Add advanced column" buttons when true. */
  showAddButtons: boolean
  /** Renders the Discard/Apply buttons when true. */
  showApplyDiscard: boolean
  onToggleFieldsPanel: () => void
  /** Adds an advanced (pipeline) column, or undefined when the schema offers none. */
  onAddAdvancedColumn?: () => void
  onDiscard: () => void
  onApply: () => void
}

/**
 * The BaseColumnEditor toolbar: add-column controls on the left, Discard/Apply on the right.
 * Either half can be hidden independently via `showAddButtons` / `showApplyDiscard`.
 */
export const ColumnEditorToolbar = ({
  showAddButtons,
  showApplyDiscard,
  onToggleFieldsPanel,
  onAddAdvancedColumn,
  onDiscard,
  onApply
}: ColumnEditorToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Toolbar
      padding={ { x: 'none', y: 'small' } }
      theme='secondary'
    >
      <Flex gap='mini'>
        { showAddButtons && (
          <>
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ onToggleFieldsPanel }
              type='default'
            >
              { t('column-editor.add-column') }
            </IconTextButton>

            { onAddAdvancedColumn !== undefined && (
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ onAddAdvancedColumn }
                type='default'
              >
                { t('column-editor.add-advanced-column') }
              </IconTextButton>
            ) }
          </>
        ) }
      </Flex>

      { showApplyDiscard && (
        <Space size='extra-small'>
          <Button
            onClick={ onDiscard }
            type='default'
          >
            { t('column-editor.discard') }
          </Button>

          <Button
            onClick={ onApply }
            type='primary'
          >
            { t('column-editor.apply') }
          </Button>
        </Space>
      ) }
    </Toolbar>
  )
}
