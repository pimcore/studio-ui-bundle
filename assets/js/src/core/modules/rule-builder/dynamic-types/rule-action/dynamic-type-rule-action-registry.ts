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
import { type DynamicTypeRuleActionAbstract, type ActionFormProps, type RuleActionConfig } from './dynamic-type-rule-action-abstract'
import { type ReactNode } from 'react'
import { type RuleItemRegistry } from '@Pimcore/modules/rule-builder/types/rule-item.types'

@injectable()
export class DynamicTypeRuleActionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeRuleActionAbstract> implements RuleItemRegistry {
  getActionFormComponent<T extends RuleActionConfig = RuleActionConfig>(
    id: string,
    props: ActionFormProps<T>
  ): ReactNode {
    return this.getDynamicType(id).renderForm(props)
  }

  getDefaultValue<T extends RuleActionConfig = RuleActionConfig>(id: string): T {
    return this.getDynamicType(id).defaultValue as T
  }
}
