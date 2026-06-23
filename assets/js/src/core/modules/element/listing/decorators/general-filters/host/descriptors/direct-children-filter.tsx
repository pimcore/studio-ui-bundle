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
import { defineFilter, type FilterControlProps } from '@Pimcore/components/filters'
import { type ElementFilterContribution, type ElementListingFilterContext } from '../element-listing-filter-context'

const DirectChildrenControl = ({ value, onChange }: FilterControlProps<boolean>): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Checkbox
      checked={ value }
      onChange={ (e) => { onChange(e.target.checked) } }
    >
      {t('element.sidebar.filter.only-direct-children')}
    </Checkbox>
  )
}

/**
 * "Only direct children" toggle. Always present; instead of a column filter it
 * patches `includeDescendants` (inverted).
 */
export const directChildrenFilterDescriptor = defineFilter<boolean, ElementFilterContribution, ElementListingFilterContext>({
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
