/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useState } from 'react'
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-abstract'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { useBatchEdit } from '@Pimcore/modules/asset/listing/batch-actions/batch-edit-modal/hooks/use-batch-edit'
export interface DynamicTypeBatchEditTextAreaProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditTextAreaComponent = ({ batchEdit }: DynamicTypeBatchEditTextAreaProps): React.JSX.Element => {
  const { addOrUpdateBatchEdit } = useBatchEdit()
  const { key, type, frontendType, locale, localizable, value: batchEditValue } = batchEdit
  const [_value, setValue] = useState(batchEditValue)

  useEffect(() => {
    setValue(batchEditValue)
  }, [batchEditValue])

  const onBlur = (): void => {
    addOrUpdateBatchEdit(key, type, frontendType, locale, localizable, _value)
  }

  return (
    <TextArea
      autoSize={ { minRows: 2 } }
      onBlur={ onBlur }
      onChange={ (event) => { setValue(event.target.value) } }
      value={ _value }
    />
  )
}
