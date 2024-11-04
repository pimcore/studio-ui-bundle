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

import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type ReactElement } from 'react'
import { type DataComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import { type FormItemProps } from 'antd/es/form/FormItem'
import { respectLineBreak } from '@Pimcore/utils/helpers'

export interface AbstractObjectDataDefinition extends DataComponentProps {
  mandatory?: boolean | null
  tooltip?: string | null
  invisible?: boolean | null
  noteditable?: boolean | null
}

@injectable()
export abstract class DynamicTypeObjectDataAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getObjectDataComponent (props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition>

  getObjectDataFormItemProps (props: AbstractObjectDataDefinition): FormItemProps {
    return {
      className: 'w-full',
      name: props.name,
      label: props.title,
      required: props.mandatory === true,
      hidden: props.invisible === true,
      tooltip: typeof props.tooltip === 'string' && props.tooltip.length > 0 ? respectLineBreak(props.tooltip, false) : undefined
    }
  }
}
