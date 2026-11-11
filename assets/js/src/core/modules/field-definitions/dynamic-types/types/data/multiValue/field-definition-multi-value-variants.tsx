/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton, Input, Space } from '@sdk/components'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { getVariantRefusals } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-refusals'
import { variantNameOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-name'

export interface FieldDefinitionMultiValueVariantsProps {
  value?: ClassificationStoreVariantLayout[] | null
  onChange?: (value: ClassificationStoreVariantLayout[]) => void
}

/** The ordered list of variants a key declares; null and an empty list both mean it declares none. */
export const FieldDefinitionMultiValueVariants = ({ value: valueProp, onChange }: FieldDefinitionMultiValueVariantsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const value = valueProp ?? []
  const refusals = getVariantRefusals(value)

  /**
   * A row has no identity of its own to key by: its name is edited in place and may be empty or
   * duplicated while it is typed, and its position changes on every move. The ids are minted here,
   * parallel to the rows, and travel with them through add, move and remove.
   */
  const ids = useRef<string[]>([])
  const nextId = useRef(0)
  const mint = (): string => `variant-${nextId.current++}`

  while (ids.current.length < value.length) {
    ids.current.push(mint())
  }
  ids.current.length = value.length

  const emit = (variants: ClassificationStoreVariantLayout[]): void => {
    onChange?.(variants)
  }

  const edit = (index: number, member: Partial<ClassificationStoreVariantLayout>): void => {
    emit(value.map((variant, position) => position === index ? { ...variant, ...member } : variant))
  }

  const move = (from: number, to: number): void => {
    const next = [...value]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    const [movedId] = ids.current.splice(from, 1)
    ids.current.splice(to, 0, movedId)
    emit(next)
  }

  return (
    <Space
      direction='vertical'
      size='small'
      style={ { width: '100%' } }
    >
      {value.map((variant, index) => (
        <Space key={ ids.current[index] }>
          <Input
            aria-label={ t('classification-store.multi-value.variant-name') }
            onChange={ (event) => { edit(index, { name: event.target.value }) } }
            placeholder={ t('classification-store.multi-value.variant-name') }
            value={ variantNameOf(variant) }
          />
          <Input
            aria-label={ t('classification-store.multi-value.variant-label') }
            onChange={ (event) => { edit(index, { label: event.target.value === '' ? null : event.target.value }) } }
            placeholder={ t('classification-store.multi-value.variant-label') }
            value={ variant.label ?? '' }
          />
          <IconButton
            disabled={ index === 0 }
            icon={ { value: 'chevron-up' } }
            onClick={ () => { move(index, index - 1) } }
            tooltip={ { title: t('classification-store.multi-value.move-up') } }
          />
          <IconButton
            disabled={ index === value.length - 1 }
            icon={ { value: 'chevron-down' } }
            onClick={ () => { move(index, index + 1) } }
            tooltip={ { title: t('classification-store.multi-value.move-down') } }
          />
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => {
              ids.current.splice(index, 1)
              emit(value.filter((_variant, position) => position !== index))
            } }
            tooltip={ { title: t('delete') } }
          />
        </Space>
      ))}

      {refusals.map((refusal) => (
        <div
          key={ refusal.id + (refusal.params?.name ?? '') }
          role='alert'
        >
          {t(refusal.id, refusal.params)}
        </div>
      ))}

      <IconButton
        icon={ { value: 'new-something' } }
        onClick={ () => {
          ids.current.push(mint())
          emit([...value, { name: '' }])
        } }
        tooltip={ { title: t('classification-store.multi-value.variant-add') } }
      />
    </Space>
  )
}
