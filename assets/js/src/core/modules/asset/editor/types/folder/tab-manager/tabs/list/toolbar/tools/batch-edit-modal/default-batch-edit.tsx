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

import React, { useMemo, type ComponentType, useState, useEffect } from 'react'
import {
  type BatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-provider'
import { Input } from 'antd'
import {
  useBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/hooks/use-batch-edit'
export interface DefaultBatchEditProps {
  batchEdit: BatchEdit
}

export const DefaultBatchEdit = ({ batchEdit }: DefaultBatchEditProps): React.JSX.Element => {
  const { key, type, value: batchEditValue } = batchEdit
  const { addOrUpdateBatchEdit } = useBatchEdit()

  const TextFilter = (): React.JSX.Element => {
    const [_value, setValue] = useState(batchEditValue)

    useEffect(() => {
      setValue(batchEditValue)
    }, [batchEditValue])

    const onBlur = (): void => {
      addOrUpdateBatchEdit(key, type, _value)
    }

    return (
      <Input
        onBlur={ onBlur }
        onChange={ (event) => { setValue(event.target.value) } }
        type='text'
        value={ _value }
      />
    )
  }

  const getComponent = (): ComponentType<DefaultBatchEditProps> => {
    switch (type) {
      case 'text':
        return TextFilter
      default:
        return TextFilter
    }
  }

  const Component = useMemo(() => {
    return getComponent()
  }, [])

  return (
    <Component batchEdit={ batchEdit } />
  )
}
