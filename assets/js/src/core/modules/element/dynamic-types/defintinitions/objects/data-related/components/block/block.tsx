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
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import { Form } from '@Pimcore/components/form/form'
import { BlockContent } from './block-content'

export interface BlockProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
}

export const Block = (props: BlockProps): React.JSX.Element => {
  return (
    <Form.List name={ props.name }>
      {(fields, operation) => (
        <BlockContent
          { ...props }
          fields={ fields }
          operation={ operation }
        />
      )}
    </Form.List>
  )
}
