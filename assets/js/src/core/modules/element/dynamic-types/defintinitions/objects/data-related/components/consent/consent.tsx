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
import { Flex } from '@Pimcore/components/flex/flex'
import { Checkbox } from 'antd'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'

export interface ConsentProps {
  value?: ConsentValue | null
  className?: string
  onChange?: (value: ConsentValue | null) => void
}

export interface ConsentValue {
  consent: boolean
  'note-text'?: string
  noteId?: number
}

export const Consent = (props: ConsentProps): React.JSX.Element => {
  const [value, setValue] = useState<ConsentValue | null>(props.value ?? null)

  const noteText = value !== null ? (value['note-text'] ?? '') : ''

  const onChange = (e: CheckboxChangeEvent): void => {
    setValue({
      consent: e.target.checked
    })
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  return (
    <Flex
      align="center"
      className={ props.className }
      gap="small"
    >
      <Checkbox onChange={ onChange } />
      { noteText.length > 0 && (
        <span>({ noteText })</span>
      ) }
    </Flex>
  )
}
