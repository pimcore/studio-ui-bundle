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

import React, { useState } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'

type DatePickerSettingValue = 'on' | 'between'

const SETTING_OPTIONS = [{ label: 'On', value: 'on' }, { label: 'Between', value: 'between' }]

export const DynamicTypeFieldFilterDatetimeComponent = (): React.JSX.Element => {
  const [settingValue, setSettingValue] = useState<DatePickerSettingValue>('on')

  return (
    <Flex>
      <Select
        onChange={ (value: DatePickerSettingValue) => { setSettingValue(value) } }
        options={ SETTING_OPTIONS }
        value={ settingValue }
        width={ 90 }
      />
    </Flex>
  )
}
