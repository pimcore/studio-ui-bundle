/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { isNonEmptyString } from '@sdk/utils'

export interface CalculatedValueLabelProps {
  label: ReactNode | string
}

export const CalculatedValueLabel = (props: CalculatedValueLabelProps): React.JSX.Element => {
  const { t } = useTranslation()
  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Icon value={ 'calculator' } />
      <span>{isNonEmptyString(props.label) ? t(props.label) : props.label}</span>
    </Flex>
  )
}
