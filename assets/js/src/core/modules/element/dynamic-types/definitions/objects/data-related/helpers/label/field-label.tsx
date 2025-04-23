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

import React, { type ReactNode } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import type { FormItemProps } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useTranslation } from 'react-i18next'
import { useItemOptional } from '@Pimcore/components/form/item/provider/item/use-item'
import { InheritanceButton } from '@Pimcore/modules/data-object/components/inheritance-button'

export interface FieldLabelProps {
  name: FormItemProps['name']
  label?: ReactNode | string
  additionalIcons?: ReactNode
}

export const FieldLabel: React.FC<FieldLabelProps> = (props: FieldLabelProps): React.JSX.Element => {
  const itemContext = useItemOptional()
  const inheritanceStateContext = useInheritanceState()
  const inheritanceState = inheritanceStateContext?.getInheritanceState(itemContext?.name ?? props.name)
  const { t } = useTranslation()

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      { inheritanceState?.inherited === true && (
        <InheritanceButton
          objectId={ inheritanceState.objectId }
        />
      )}
      { inheritanceState?.inherited === 'broken' && (
        <Tooltip title={ t('inheritance-broken') }>
          <Icon value="inheritance-broken" />
        </Tooltip>
      ) }
      { props.additionalIcons }
      <span>{props.label}</span>
    </Flex>
  )
}
