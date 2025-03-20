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

import React from 'react'
import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { toCssDimension } from '@Pimcore/utils/css'

export type TextareaObjectDataDefinition = AbstractObjectDataDefinition & {
  showCharCount: boolean
  maxLength: number | null
  width?: number | string | null
}

export class DynamicTypeObjectDataTextarea extends DynamicTypeObjectDataAbstract {
  id: string = 'textarea'

  getObjectDataComponent (props: TextareaObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <TextArea
        autoSize={ { minRows: 3 } }
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxLength={ props.maxLength ?? undefined }
        showCount={ props.showCharCount }
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.large) } }
        value={ props.value }
      />
    )
  }
}
