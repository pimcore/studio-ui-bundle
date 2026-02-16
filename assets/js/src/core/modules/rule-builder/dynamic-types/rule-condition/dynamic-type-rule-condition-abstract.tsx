/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import type { RuleBaseCondition, RuleConditionFormProps } from '@Pimcore/components/rule-condition/types/rule-condition.types'
import type { ReactNode } from 'react'
import type { ElementIcon } from '@Pimcore/components/icon/icon'

@injectable()
export abstract class DynamicTypeRuleConditionAbstract<T extends RuleBaseCondition = RuleBaseCondition> extends DynamicTypeAbstract {
  abstract readonly id: string
  abstract readonly label: string
  readonly icon?: ElementIcon
  abstract readonly defaultValue: Partial<Omit<T, 'id' | 'type'>>

  /**
   * Optional availability check. If this function returns false, the condition
   * will be disabled in the "Add Condition" dropdown and show a warning if already configured.
   * Defaults to true if not implemented.
   */
  readonly isAvailable?: () => boolean

  /**
   * Optional hint to display when the condition is not available.
   * Shown as a tooltip in the dropdown and as a warning message in configured conditions.
   */
  readonly notAvailableHint?: string

  /**
   * Render the form for this condition type.
   * Must be an arrow function property to preserve 'this' binding.
   *
   * @example
   * renderForm = (props: RuleConditionFormProps<MyConditionConfig>): ReactNode => {
   *   return <MyForm {...props} />
   * }
   */
  abstract renderForm: (props: RuleConditionFormProps<T>) => ReactNode
}
