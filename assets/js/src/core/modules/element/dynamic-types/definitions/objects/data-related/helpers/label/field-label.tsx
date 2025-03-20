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
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useStyles } from './field-label.styles'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useTranslation } from 'react-i18next'
import { useItemOptional } from '@Pimcore/components/form/item/provider/item/use-item'

export interface FieldLabelProps {
  name: FormItemProps['name']
  label?: ReactNode | string
  additionalIcons?: ReactNode
}

export const FieldLabel: React.FC<FieldLabelProps> = (props: FieldLabelProps): React.JSX.Element => {
  const { styles } = useStyles()
  const itemContext = useItemOptional()
  const inheritanceStateContext = useInheritanceState()
  const inheritanceState = inheritanceStateContext?.getInheritanceState(itemContext?.name ?? props.name)
  const { openDataObject } = useDataObjectHelper()
  const { t } = useTranslation()

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      { inheritanceState?.inherited === true && (
        <Tooltip title={ t('inheritance-active', { id: inheritanceState?.objectId }) }>
          <IconButton
            className={ styles.inheritanceButton }
            icon={ { value: 'inheritance-active' } }
            onClick={ () => { openDataObject({ config: { id: inheritanceState?.objectId } }) } }
            type="link"
            variant="minimal"
          />
        </Tooltip>
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
