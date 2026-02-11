/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Split } from '@Pimcore/components/split/split'
import { Alert } from '@Pimcore/components/alert/alert'
import { type RuleBaseCondition } from '../../types/rule-condition.types'
import { useRuleConditionContext } from '../../provider/rule-condition-provider/use-rule-condition-context'
import { useAddConditionMenuItems } from '../../hooks/use-add-condition-menu-items'
import { useStyles } from './condition-item.styles'
import { BracketButton } from '../bracket-button/bracket-button'
import { OperatorSelector } from '../operator-selector/operator-selector'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { isBracketUnmatched } from '../../utils/condition-array-utils'
import { CONDITION_INDENTATION_PER_LEVEL, CONDITION_BORDER_COLOR_LEVELS } from '../../rule-condition.constants'
import { useSortableItem } from '@Pimcore/modules/rule-builder/components/shared/hooks/use-sortable-item'

interface ConditionItemProps {
  condition: RuleBaseCondition
  currentIndex: number
  indentationLevel: number
  allConditions: RuleBaseCondition[]
  showOperator: boolean
  isFirst: boolean
  isLast: boolean
}

export const ConditionItem = ({
  condition,
  currentIndex,
  indentationLevel,
  allConditions,
  showOperator,
  isFirst,
  isLast
}: ConditionItemProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const {
    conditionTypes,
    disabled,
    onConditionChange,
    onConditionRemove,
    onOperatorChange,
    onBracketToggle,
    onConditionMove,
    newlyAddedId
  } = useRuleConditionContext()

  const { attributes, listeners, setNodeRef, style } = useSortableItem(condition.id)

  const currentTypeConfig = useMemo(() => {
    return conditionTypes.find((t) => t.id === condition.type)
  }, [conditionTypes, condition.type])

  const isAvailable = useMemo(() => {
    return currentTypeConfig?.isAvailable?.() ?? true
  }, [currentTypeConfig])

  const handleValueChange = (newCondition: RuleBaseCondition): void => {
    onConditionChange(condition.id, newCondition)
  }

  const conditionTitle = currentTypeConfig?.label !== undefined ? t(currentTypeConfig.label) : condition.type

  const addMenuItems = useAddConditionMenuItems(currentIndex)

  const handleMoveUp = (): void => {
    if (!isFirst) {
      onConditionMove(condition.id, currentIndex - 1)
    }
  }

  const handleMoveDown = (): void => {
    if (!isLast) {
      onConditionMove(condition.id, currentIndex + 1)
    }
  }

  const leftBracketUnmatched = useMemo(() => {
    return (condition.bracketLeft === true) && isBracketUnmatched(allConditions, condition.id, 'left')
  }, [allConditions, condition.id, condition.bracketLeft])

  const rightBracketUnmatched = useMemo(() => {
    return (condition.bracketRight === true) && isBracketUnmatched(allConditions, condition.id, 'right')
  }, [allConditions, condition.id, condition.bracketRight])

  const getBorderClass = (): string => {
    const isNewlyAdded = condition.id === newlyAddedId

    if (indentationLevel === 0) {
      return isNewlyAdded ? styles.conditionItemWrapperNew : ''
    }

    const borderClasses = [
      styles.borderLevel1,
      styles.borderLevel2,
      styles.borderLevel3
    ]

    const colorIndex = (indentationLevel - 1) % CONDITION_BORDER_COLOR_LEVELS
    const baseClass = `${styles.conditionItemWrapper} ${borderClasses[colorIndex]}`

    return isNewlyAdded ? `${baseClass} ${styles.conditionItemWrapperNew}` : baseClass
  }

  return (
    <div
      className={ getBorderClass() }
      style={ {
        marginLeft: `${indentationLevel * CONDITION_INDENTATION_PER_LEVEL}px`,
        marginRight: `${indentationLevel * CONDITION_INDENTATION_PER_LEVEL}px`
      } }
    >
      {showOperator && (
        <Box
          margin={ { top: 'extra-small', bottom: 'extra-small' } }
          padding="extra-small"
        >
          <Flex
            align="center"
            gap="extra-small"
          >
            <OperatorSelector
              disabled={ disabled }
              onChange={ (op) => { onOperatorChange(condition.id, op) } }
              value={ condition.operator ?? 'and' }
            />
          </Flex>
        </Box>
      )}

      <Flex
        align="stretch"
        gap="extra-small"
        ref={ setNodeRef }
        style={ style }
        { ...attributes }
      >
        <BracketButton
          active={ condition.bracketLeft ?? false }
          disabled={ disabled }
          hasError={ leftBracketUnmatched }
          onToggle={ () => { onBracketToggle(condition.id, 'left') } }
          side="left"
        />

        <div className={ styles.conditionBoxWrapper }>
          <ToolStripBox
            renderToolStripStart={
              <ToolStrip
                additionalIcon={ currentTypeConfig?.icon }
                additionalIconAutoColor
                additionalIconPosition="before"
                dragger={ disabled ? false : { listeners: { ...attributes, ...listeners } } }
                theme="default"
                title={ conditionTitle }
              >
                <Split
                  dividerSize="small"
                  size="mini"
                  theme="secondary"
                >
                  <Flex gap="extra-small">
                    <Dropdown
                      disabled={ disabled }
                      menu={ { items: addMenuItems } }
                      trigger={ ['click'] }
                    >
                      <IconButton
                        disabled={ disabled }
                        icon={ { value: 'plus-circle' } }
                        size="small"
                        tooltip={ { title: t('rule-condition.add-condition') } }
                      />
                    </Dropdown>
                    <IconButton
                      disabled={ disabled || isFirst }
                      icon={ { value: 'chevron-up' } }
                      onClick={ handleMoveUp }
                      size="small"
                      tooltip={ { title: t('rule-condition.move-up') } }
                    />
                    <IconButton
                      disabled={ disabled || isLast }
                      icon={ { value: 'chevron-down' } }
                      onClick={ handleMoveDown }
                      size="small"
                      tooltip={ { title: t('rule-condition.move-down') } }
                    />
                  </Flex>

                  <IconButton
                    disabled={ disabled }
                    icon={ { value: 'trash' } }
                    onClick={ () => { onConditionRemove(condition.id) } }
                    size="small"
                    tooltip={ { title: t('rule-condition.remove') } }
                  />
                </Split>
              </ToolStrip>
            }
          >
            {!isAvailable && currentTypeConfig?.notAvailableHint !== undefined && (
              <Alert
                banner
                message={ t(currentTypeConfig.notAvailableHint) }
                showIcon
                type="warning"
              />
            )}
            {currentTypeConfig !== undefined
              ? (
                <div className={ styles.conditionFormContainer }>
                  <ErrorBoundary>
                    {currentTypeConfig.renderForm({
                      value: condition,
                      onChange: handleValueChange,
                      disabled
                    })}
                  </ErrorBoundary>
                </div>
                )
              : (
                <Alert
                  banner
                  message={ `Unknown condition type: ${condition.type}` }
                  type="warning"
                />
                )}
          </ToolStripBox>
        </div>

        <BracketButton
          active={ condition.bracketRight ?? false }
          disabled={ disabled }
          hasError={ rightBracketUnmatched }
          onToggle={ () => { onBracketToggle(condition.id, 'right') } }
          side="right"
        />
      </Flex>
    </div>
  )
}
