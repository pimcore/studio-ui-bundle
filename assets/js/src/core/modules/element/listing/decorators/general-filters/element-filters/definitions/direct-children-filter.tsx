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
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { defineFilter, useFilterCommitOptional, type FilterControlProps } from '@Pimcore/components/filters'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'

const DirectChildrenControl = ({ value, onChange }: FilterControlProps<boolean>): React.JSX.Element => {
  const { t } = useTranslation()
  const commit = useFilterCommitOptional()

  /**
   * Ticking the box is the whole interaction, so it applies itself instead of waiting for
   * "Apply". The draft write below lands in the same render, hence the explicit `committed`.
   */
  const onCheckboxChange = (checked: boolean): void => {
    onChange(checked)
    commit?.({ directChildren: checked })
  }

  return (
    <Checkbox
      checked={ value }
      onChange={ (e) => { onCheckboxChange(e.target.checked) } }
    >
      {t('element.sidebar.filter.only-direct-children')}
    </Checkbox>
  )
}

export const directChildrenFilterDescriptor = defineFilter<boolean, ElementFilterQueryPart, ElementFilterContext>({
  key: 'directChildren',
  defaultValue: false,
  section: 'controls',
  order: 20,
  isEnabled: () => true,
  Control: DirectChildrenControl,
  toQuery: (value) => ({
    kind: 'argsPatch',
    apply: (filters) => ({ ...filters, includeDescendants: !value })
  })
})
