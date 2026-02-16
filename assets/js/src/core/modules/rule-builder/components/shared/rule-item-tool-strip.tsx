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
import { ToolStrip, type DragHandleProps } from '@Pimcore/components/toolstrip/tool-strip'
import { Flex } from '@Pimcore/components/flex/flex'
import { Split } from '@Pimcore/components/split/split'
import type { ElementIcon } from '@Pimcore/components/icon/icon'

export interface RuleItemToolStripProps {
  label: string
  icon?: ElementIcon
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  canMoveUp: boolean
  canMoveDown: boolean
  disabled?: boolean
  dragHandleProps?: DragHandleProps | false
}

export const RuleItemToolStrip = ({
  label,
  icon,
  onMoveUp,
  onMoveDown,
  onRemove,
  canMoveUp,
  canMoveDown,
  disabled = false,
  dragHandleProps = false
}: RuleItemToolStripProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ToolStrip
      additionalIcon={ icon }
      additionalIconAutoColor
      additionalIconPosition="before"
      dragger={ dragHandleProps }
      theme="default"
      title={ t(label) }
    >
      <Split
        dividerSize="small"
        size="mini"
        theme="secondary"
      >
        <Flex gap="extra-small">
          <IconButton
            disabled={ disabled || !canMoveUp }
            icon={ { value: 'chevron-up' } }
            onClick={ onMoveUp }
            size="small"
            tooltip={ { title: t('rule-builder.move-up') } }
          />

          <IconButton
            disabled={ disabled || !canMoveDown }
            icon={ { value: 'chevron-down' } }
            onClick={ onMoveDown }
            size="small"
            tooltip={ { title: t('rule-builder.move-down') } }
          />
        </Flex>

        <IconButton
          disabled={ disabled }
          icon={ { value: 'trash' } }
          onClick={ onRemove }
          size="small"
          tooltip={ { title: t('rule-builder.remove') } }
        />
      </Split>
    </ToolStrip>
  )
}
