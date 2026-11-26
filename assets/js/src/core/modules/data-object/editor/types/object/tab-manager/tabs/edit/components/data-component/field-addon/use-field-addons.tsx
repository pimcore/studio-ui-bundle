/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useMemo } from 'react'
import { isNil } from 'lodash'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/use-component-registry'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useAppSelector } from '@sdk/app'
import { selectDataObjectById } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { useLocalizedFields } from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields'
import { type AbstractObjectDataDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'

/**
 * Props of a component registered to one of the field addon slots of the data object edit form:
 *
 * - `componentConfig.dataObject.editor.field.after`: on the row of the control, right after it
 * - `componentConfig.dataObject.editor.field.below`: under the control
 * - `componentConfig.dataObject.editor.field.label`: at the end of the label row
 *
 * The slots are rendered for every data field (not for containers such as blocks, field
 * collections or object bricks themselves, but for the fields inside them), so a component
 * decides from these props whether it applies and returns null otherwise.
 */
export interface DataObjectFieldAddonProps {
  objectId: number
  /** Name of the class of the object */
  className: string
  fieldDefinition: AbstractObjectDataDefinition
  /**
   * Path from the object down to the field, e.g. `['attributes', 'Dimensions', 'height']` for a
   * field of an object brick, `['localizedfields', 'name']` for a localized field (the locale is
   * in `locale`) or `['features', 0, 'Color', 'hue']` for a field of a field collection item.
   */
  fieldPath: Array<string | number>
  /** Locale of the value, set for a field inside localized fields */
  locale?: string
}

export interface FieldAddons {
  after?: ReactNode
  below?: ReactNode
  label?: ReactNode
}

interface FieldAddonSlotProps {
  slot: string
  objectId: number
  fieldDefinition: AbstractObjectDataDefinition
  fieldPath: Array<string | number>
}

const FieldAddonSlot = ({ slot, objectId, fieldDefinition, fieldPath }: FieldAddonSlotProps): React.JSX.Element | null => {
  const className = useAppSelector(state => selectDataObjectById(state, objectId)?.className)
  const locale = useLocalizedFields()?.locales[0]

  if (isNil(className)) {
    return null
  }

  const props: DataObjectFieldAddonProps = { objectId, className, fieldDefinition, fieldPath, locale }

  return (
    <SlotRenderer
      props={ props }
      slot={ slot }
    />
  )
}

const slots = componentConfig.dataObject.editor.field

/**
 * The addons registered for a data field, one node per slot that has entries. A slot without
 * entries stays undefined, so a field nobody extends renders exactly as before. A field without
 * a path (one rendered outside the edit form) gets none.
 */
export const useFieldAddons = (fieldDefinition: AbstractObjectDataDefinition, fieldPath: Array<string | number> | undefined): FieldAddons => {
  const componentRegistry = useComponentRegistry()
  const elementContext = useOptionalElementContext()
  const objectId = elementContext?.elementType === 'data-object' ? elementContext.id : undefined
  const fieldPathKey = fieldPath?.join('.')

  return useMemo(() => {
    if (objectId === undefined || fieldPath === undefined) {
      return {}
    }

    const renderSlot = (slot: string): ReactNode => {
      if (componentRegistry.getSlotComponents(slot).length === 0) {
        return undefined
      }

      return (
        <FieldAddonSlot
          fieldDefinition={ fieldDefinition }
          fieldPath={ fieldPath }
          objectId={ objectId }
          slot={ slot }
        />
      )
    }

    return {
      after: renderSlot(slots.after.name),
      below: renderSlot(slots.below.name),
      label: renderSlot(slots.label.name)
    }
  }, [componentRegistry, objectId, fieldDefinition, fieldPathKey])
}
