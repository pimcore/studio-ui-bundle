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

import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ObjectBrick, type ObjectBrickProps } from '../components/object-brick/object-brick'
import { type FormItemProps } from 'antd'

export class DynamicTypeObjectDataObjectBrick extends DynamicTypeObjectDataAbstract {
  id: string = 'objectbricks'
  isCollectionType: boolean = false

  getObjectDataComponent (props: ObjectBrickProps): React.ReactElement<ObjectBrickProps> {
    return <ObjectBrick { ...props } />
  }

  getObjectDataFormItemProps (props: ObjectBrickProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }
}
