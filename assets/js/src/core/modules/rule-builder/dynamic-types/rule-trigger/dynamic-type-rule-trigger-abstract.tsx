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
import { type ElementIcon } from '@Pimcore/components/icon/icon'
import { type ReactNode } from 'react'

export type RuleTriggerConfig = Record<string, unknown>

export interface TriggerFormProps<T = RuleTriggerConfig> {
  value: T
  onChange: (value: T) => void
  disabled?: boolean
}

@injectable()
export abstract class DynamicTypeRuleTriggerAbstract<T extends RuleTriggerConfig = RuleTriggerConfig> extends DynamicTypeAbstract {
  abstract readonly id: string
  abstract readonly label: string
  readonly icon?: ElementIcon
  abstract readonly defaultValue: T

  /**
   * Optional availability check. If this function returns false, the trigger
   * will be disabled in the "Add Trigger" dropdown and show a warning if already configured.
   * Defaults to true if not implemented.
   */
  readonly isAvailable?: () => boolean

  /**
   * Optional hint to display when the trigger is not available.
   * Shown as a tooltip in the dropdown and as a warning message in configured triggers.
   */
  readonly notAvailableHint?: string

  /**
   * Render the form for configuring this trigger.
   * Must be an arrow function property to preserve 'this' binding.
   *
   * @example
   * renderForm = (props: TriggerFormProps<MyTriggerConfig>): ReactNode => {
   *   return <MyForm {...props} />
   * }
   */
  abstract renderForm: (props: TriggerFormProps<T>) => ReactNode
}
