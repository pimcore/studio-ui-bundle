/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { type FormItemProps } from 'antd'
import { ClassificationStore } from '../components/classification-store/classification-store'
import { type ClassificationStoreContentProps } from '../components/classification-store/classification-store-content'

export class DynamicTypeObjectDataClassificationStore extends DynamicTypeObjectDataAbstract {
  id: string = 'classificationstore'

  getObjectDataComponent (props: ClassificationStoreContentProps): React.ReactElement<ClassificationStoreContentProps> {
    return <ClassificationStore { ...props } />
  }

  getObjectDataFormItemProps (props: ClassificationStoreContentProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }
}
