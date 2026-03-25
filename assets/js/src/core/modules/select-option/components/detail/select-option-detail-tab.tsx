/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSelectOptionEditorContext } from '@Pimcore/modules/select-option/context/hooks/use-select-option-editor-context'
import React from 'react'
import { SelectOptionForm } from './select-option-form'

interface SelectOptionDetailTabProps {
  id: string | undefined
}

export const SelectOptionDetailTab = ({ id }: SelectOptionDetailTabProps): React.JSX.Element => {
  const { selectOptions } = useSelectOptionEditorContext()
  const selectOption = selectOptions.find(s => s.id === id)

  if (selectOption === undefined) {
    return <></>
  }

  return (
    <SelectOptionForm selectOption={ selectOption } />
  )
}
