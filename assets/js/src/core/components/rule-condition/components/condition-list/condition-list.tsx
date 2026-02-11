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
import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { type RuleBaseCondition } from '../../types/rule-condition.types'
import { useRuleConditionContext } from '../../provider/rule-condition-provider/use-rule-condition-context'
import { ConditionItem } from '../condition-item/condition-item'
import { AddConditionButton } from '../add-condition-button/add-condition-button'
import { calculateIndentationLevels, validateBrackets } from '../../utils/condition-array-utils'
import {
  CONDITION_INDENTATION_PER_LEVEL,
  CONDITION_LIST_BASE_MIN_WIDTH,
  BRACKET_ERROR_CLOSING_WITHOUT_OPENING,
  BRACKET_ERROR_MISSING_CLOSING
} from '../../rule-condition.constants'

interface ConditionListProps {
  conditions: RuleBaseCondition[]
}

export const ConditionList = ({ conditions }: ConditionListProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { disabled } = useRuleConditionContext()

  const indentationLevels = useMemo(() => {
    return calculateIndentationLevels(conditions)
  }, [conditions])

  const maxIndentation = useMemo(() => {
    return indentationLevels.length > 0 ? Math.max(...indentationLevels) : 0
  }, [indentationLevels])

  const minWidth = useMemo(() => {
    return `${maxIndentation * CONDITION_INDENTATION_PER_LEVEL * 2 + CONDITION_LIST_BASE_MIN_WIDTH}px`
  }, [maxIndentation])

  const bracketValidation = useMemo(() => {
    return validateBrackets(conditions)
  }, [conditions])

  const getValidationMessage = (): string => {
    if (bracketValidation.errorType == null || bracketValidation.errorType === '') {
      return ''
    }

    switch (bracketValidation.errorType) {
      case BRACKET_ERROR_CLOSING_WITHOUT_OPENING:
        return t('rule-condition.validation.brackets-closing-without-opening')
      case BRACKET_ERROR_MISSING_CLOSING:
        return t('rule-condition.validation.brackets-missing-closing')
      default:
        return t('rule-condition.validation.brackets-invalid')
    }
  }

  if (conditions.length === 0) {
    return (
      <Box padding={ { y: 'extra-small' } }>
        <Flex
          align="center"
          justify="flex-start"
        >
          <AddConditionButton
            afterIndex={ -1 }
            disabled={ disabled }
          />
        </Flex>
      </Box>
    )
  }

  return (
    <Flex
      style={ { minWidth } }
      vertical
    >
      {conditions.map((condition, index) => (
        <ConditionItem
          allConditions={ conditions }
          condition={ condition }
          currentIndex={ index }
          indentationLevel={ indentationLevels[index] ?? 0 }
          isFirst={ index === 0 }
          isLast={ index === conditions.length - 1 }
          key={ condition.id }
          showOperator={ index > 0 }
        />
      ))}

      <Box margin={ { top: 'small' } }>
        <Flex justify="flex-start">
          <AddConditionButton
            afterIndex={ conditions.length - 1 }
            disabled={ disabled }
          />
        </Flex>
      </Box>

      {!bracketValidation.valid && (
        <Box margin={ { top: 'medium' } }>
          <Alert
            banner
            message={ getValidationMessage() }
            showIcon
            type="warning"
          />
        </Box>
      )}
    </Flex>
  )
}
