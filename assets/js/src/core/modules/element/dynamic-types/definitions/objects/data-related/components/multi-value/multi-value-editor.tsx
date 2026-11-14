/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { Alert } from 'antd'
import { isEqual, isNil, omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Tag } from '@Pimcore/components/tag/tag'
import { Text } from '@Pimcore/components/text/text'
import { Title } from '@Pimcore/components/title/title'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { DataComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import {
  type ClassificationStoreMultiValueDefinition,
  type ClassificationStoreMultiValueEntry,
  type ClassificationStoreCollection2
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { SuppressEmptyFieldLabelProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider'
import { MULTI_VALUE_OWN_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-own-keys'
import { CLASSIFICATION_STORE_WRAPPER_TYPES } from '@Pimcore/modules/field-definitions/dynamic-types/utils/classification-store-key-types'
import {
  buildSlots,
  canAdd,
  declaredVariantsOf,
  indexesOf,
  isReadableValue,
  orderEntries,
  seedEmptySlots,
  slotKeyOf,
  withPositions,
  type MultiValueSlot
} from './multi-value-slots'

export interface MultiValueEditorProps extends ClassificationStoreMultiValueDefinition, Pick<ClassificationStoreCollection2, 'variants' | 'multiValue' | 'maximum' | 'defaultVariant' | 'defaultVariantLabel'> {
  noteditable?: boolean | null
  value?: unknown
  onChange?: (value: ClassificationStoreMultiValueEntry[]) => void
}

interface SlotsProps extends MultiValueEditorProps {
  delegateDatatype: string
}

/** The members of the definition that are the delegate's own settings: the dialog writes them at the top level, beside the key's own. */
const delegateSettingsOf = (props: Record<string, unknown>): Record<string, unknown> =>
  omit(props, [...MULTI_VALUE_OWN_KEYS, 'value', 'onChange', 'noteditable', 'slot', 'index'])

/** One entry's input: the delegate type's own widget, bound to the `v` member of the entry at `index`. */
const EntryInput = ({ index, ...props }: SlotsProps & { index: number }): React.JSX.Element => (
  <Form.Group name={ index }>
    <SuppressEmptyFieldLabelProvider>
      <DataComponent
        { ...delegateSettingsOf(props) }
        { ...props.delegate }
        datatype='data'
        fieldType={ props.delegateDatatype }
        name='v'
        noteditable={ props.noteditable === true }
        title=''
        tooltip=''
      />
    </SuppressEmptyFieldLabelProvider>
  </Form.Group>
)

const SlotView = ({ slot, ...props }: SlotsProps & { slot: MultiValueSlot }): React.JSX.Element => {
  const { t } = useTranslation()
  const { values, operations } = useNumberedList()
  const entries = values as ClassificationStoreMultiValueEntry[]
  const indexes = indexesOf(entries, slot)
  const isRepeating = props.multiValue === true
  const isEditable = props.noteditable !== true
  const hasVariants = declaredVariantsOf(props.variants).length > 0
  const heading = slot.label ?? (hasVariants || !slot.declared ? t('classification-store.multi-value.default-variant') : null)
  const addAllowed = canAdd(props.maximum, indexes.length)
  // A variant no longer declared, or a default the key now declines, keeps the values it holds and takes no new ones.
  const canAddHere = slot.declared

  const move = (position: number, delta: -1 | 1): void => {
    const neighbour = indexes[position + delta]

    if (neighbour !== undefined) {
      operations.move(indexes[position], neighbour)
    }
  }

  return (
    <Flex
      gap='extra-small'
      vertical
    >
      {heading !== null && (
        <Flex
          align='center'
          gap='extra-small'
        >
          <Title level={ 5 }>{heading}</Title>
          {!slot.declared && <Tag>{t('classification-store.multi-value.not-declared')}</Tag>}
        </Flex>
      )}

      {isRepeating && indexes.length === 0 && <Text type='secondary'>{t('classification-store.multi-value.empty')}</Text>}

      {indexes.map((index, position) => (
        <Flex
          align='start'
          gap='extra-small'
          // Keyed by slot where the key does not repeat, so seeding an empty entry keeps the input mounted; by position too, so a slot holding two stored values keys them apart.
          key={ isRepeating ? `entry-${index}` : `${slotKeyOf(slot)}-${position}` }
        >
          <div className='w-full'>
            <EntryInput
              { ...props }
              index={ index }
            />
          </div>
          {isRepeating && isEditable && (
            <>
              <IconButton
                disabled={ position === 0 }
                icon={ { value: 'chevron-up' } }
                onClick={ () => { move(position, -1) } }
                tooltip={ { title: t('classification-store.multi-value.move-up') } }
              />
              <IconButton
                disabled={ position === indexes.length - 1 }
                icon={ { value: 'chevron-down' } }
                onClick={ () => { move(position, 1) } }
                tooltip={ { title: t('classification-store.multi-value.move-down') } }
              />
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ () => { operations.remove(index) } }
                tooltip={ { title: t('delete') } }
              />
            </>
          )}
        </Flex>
      ))}

      {isRepeating && isEditable && canAddHere && (
        <Flex
          align='center'
          gap='extra-small'
        >
          <IconTextButton
            disabled={ !addAllowed }
            icon={ { value: 'new' } }
            onClick={ () => { operations.add(slot.variant === null ? {} : { var: slot.variant }) } }
          >
            {t('add')}
          </IconTextButton>
          {!addAllowed && (
            <Text type='secondary'>{t('classification-store.multi-value.maximum-reached', { count: props.maximum ?? 0 })}</Text>
          )}
        </Flex>
      )}
    </Flex>
  )
}

const Slots = (props: SlotsProps): React.JSX.Element => {
  const { values } = useNumberedList()
  const entries = values as ClassificationStoreMultiValueEntry[]
  const slots = buildSlots(props.variants, entries, props)

  return (
    <Flex
      gap='small'
      vertical
    >
      {slots.map((slot) => (
        <SlotView
          { ...props }
          key={ slotKeyOf(slot) }
          slot={ slot }
        />
      ))}
    </Flex>
  )
}

const withoutEmpty = (list: ClassificationStoreMultiValueEntry[]): ClassificationStoreMultiValueEntry[] =>
  list.filter((entry) => !isNil(entry) && !isNil(entry.v))

/** The value of a key of type `multiValue`: entries held as a list, shown in one slot per variant. */
export const MultiValueEditor = (props: MultiValueEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const entries = useMemo(() => orderEntries(props.value), [props.value])
  // A slot that holds one value and has none stored is seeded as an empty entry, so the list's initial value already is what the inputs register.
  const base = useMemo(
    () => props.multiValue === true ? entries : seedEmptySlots(props.variants, entries, props),
    [entries, props.variants, props.multiValue, props.defaultVariant, props.defaultVariantLabel]
  )
  // What the control holds, empty rows included: only the payload leaves them out, so a row still being worked on survives the value coming back.
  const [draft, setDraft] = useState<ClassificationStoreMultiValueEntry[] | null>(null)
  const seeded = draft !== null && isEqual(withoutEmpty(draft), withoutEmpty(entries)) ? draft : base
  const delegateDatatype = props.delegateDatatype

  if (isNil(delegateDatatype) || delegateDatatype === '') {
    return (
      <Alert
        message={ t('classification-store.multi-value.no-delegate') }
        type='warning'
      />
    )
  }

  if (!objectDataRegistry.hasDynamicType(delegateDatatype) || CLASSIFICATION_STORE_WRAPPER_TYPES.includes(delegateDatatype)) {
    return (
      <Alert
        message={ t('classification-store.multi-value.unknown-delegate', { type: delegateDatatype }) }
        type='warning'
      />
    )
  }

  // A value stored before the key declared itself a multiValue is not a list: say so rather than show it as no value, and write nothing over it.
  if (!isReadableValue(props.value)) {
    return (
      <Alert
        message={ t('classification-store.multi-value.unreadable-value') }
        type='warning'
      />
    )
  }

  // An entry holding nothing is left out of what is written, which is how a cleared slot is cleared.
  // What equals the value already held is not a change: the list registers the fields it mounts, and that is not an edit.
  const emit = (list: ClassificationStoreMultiValueEntry[]): void => {
    setDraft(list)

    const kept = withoutEmpty(list)

    if (!isEqual(kept, withoutEmpty(entries))) {
      props.onChange?.(withPositions(kept))
    }
  }

  return (
    <Form.NumberedList
      onChange={ emit }
      value={ seeded }
    >
      <Slots
        { ...props }
        delegateDatatype={ delegateDatatype }
      />
    </Form.NumberedList>
  )
}
