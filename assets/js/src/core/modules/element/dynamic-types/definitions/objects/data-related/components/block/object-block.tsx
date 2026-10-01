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
  LocalizedFieldsContext
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import {
  useLocalizedFields
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields'
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
  // The title is rendered inside the numbered list, which hides from its items the
  // keyed list holding the block value (when the block sits in an object brick or
  // classification store) and the localized fields the block belongs to. The title
  // describes the block itself, not an item, so the restore action in it gets both
  // back: the list to write through, the locale to check the edit permission of.
  const keyedList = useKeyedListOptional()
  const localizedFields = useLocalizedFields()
  const restoreContext = useMemo(() => ({ keyedList }), [keyedList])

  const title = (
    <LocalizedFieldsContext.Provider value={ localizedFields }>
      <RestoreInheritanceKeyedListContext.Provider value={ restoreContext }>
        { props.title }
      </RestoreInheritanceKeyedListContext.Provider>
    </LocalizedFieldsContext.Provider>
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
