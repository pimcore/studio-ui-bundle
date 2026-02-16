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
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type DynamicTypeRuleTriggerAbstract, type TriggerFormProps, type RuleTriggerConfig } from './dynamic-type-rule-trigger-abstract'
import { type ReactNode } from 'react'
import { type RuleItemRegistry } from '@Pimcore/modules/rule-builder/types/rule-item.types'

@injectable()
export class DynamicTypeRuleTriggerRegistry extends DynamicTypeRegistryAbstract<DynamicTypeRuleTriggerAbstract> implements RuleItemRegistry {
  getTriggerFormComponent<T extends RuleTriggerConfig = RuleTriggerConfig>(
    id: string,
    props: TriggerFormProps<T>
  ): ReactNode {
    return this.getDynamicType(id).renderForm(props)
  }

  getDefaultValue<T extends RuleTriggerConfig = RuleTriggerConfig>(id: string): T {
    return this.getDynamicType(id).defaultValue as T
  }
}
