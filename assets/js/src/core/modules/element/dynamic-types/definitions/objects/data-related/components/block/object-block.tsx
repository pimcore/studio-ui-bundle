/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import { ObjectBlockContent } from './object-block-content'
import { Form } from '@Pimcore/components/form/form'
import { useKeyedListOptional } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-optional'
import {
  RestoreInheritanceKeyedListContext
} from '../../helpers/label/hooks/restore-inheritance-keyed-list-context'

export interface ObjectBlockProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition | Array<AbstractObjectLayoutDefinition | AbstractObjectDataDefinition>
  collapsed?: boolean
  collapsible?: boolean
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  inherited?: boolean
  onChange?: (value: any) => void
  value?: any
}

export const ObjectBlock = (props: ObjectBlockProps): React.JSX.Element => {
  // The title is rendered inside the numbered list, which hides the keyed list that
  // holds the block value when the block sits in an object brick or classification
  // store. The restore action in the title has to reach that list, so it is passed on.
  const keyedList = useKeyedListOptional()
  const restoreContext = useMemo(() => ({ keyedList }), [keyedList])

  const title = (
    <RestoreInheritanceKeyedListContext.Provider value={ restoreContext }>
      { props.title }
    </RestoreInheritanceKeyedListContext.Provider>
  )

  return (
    <Form.NumberedList
      onChange={ props.onChange }
      value={ props.value }
    >
      <ObjectBlockContent
        { ...props }
        title={ title }
      />
    </Form.NumberedList>
  )
}
