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
import { useTranslation } from 'react-i18next'
import { Alert } from '@Pimcore/components/alert/alert'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Select } from '@Pimcore/components/select/select'
import { Text } from '@Pimcore/components/text/text'
import {
  clearUnits,
  defaultUnitChoices,
  keyUnitsOf,
  resolveSubset,
  setDefaultUnit,
  toggleUnit,
  unitSymbol
} from './key-override'
import { StatedState, SubsetPicker, type ISectionProps, type ISubsetRow } from './key-override-sections'

const USE_DEFAULT = ''

export const UnitsSection = ({ relation, draft, onChange }: ISectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const keyUnits = keyUnitsOf(relation)
  const resolved = resolveSubset(draft.validUnits, keyUnits.map((unit) => unit.id))
  const choices = defaultUnitChoices(relation, draft)
  const storedDefault = draft.defaultUnit
  const defaultOutside = storedDefault !== undefined && !(typeof storedDefault === 'string' && choices.includes(storedDefault))
  const clearUnitsAction = (
    <div>
      <IconTextButton
        disabled={ draft.validUnits === undefined }
        icon={ { value: 'clear-filter' } }
        onClick={ () => { onChange(clearUnits(relation, draft)) } }
      >
        { t('classification-store.override.use-key-units') }
      </IconTextButton>
    </div>
  )

  const renderValidUnits = (): React.JSX.Element => {
    if (keyUnits.length === 0) {
      return (
        <Flex
          gap="mini"
          vertical
        >
          <Alert
            message={ t('classification-store.override.units-no-vocabulary') }
            showIcon
            type="info"
          />
          { draft.validUnits !== undefined && clearUnitsAction }
        </Flex>
      )
    }

    if (resolved.status === 'invalid' || resolved.status === 'empty' || resolved.status === 'stale-only') {
      const description = resolved.status === 'invalid'
        ? t('classification-store.override.stored-unreadable')
        : resolved.status === 'empty'
          ? t('classification-store.override.units-empty')
          : t('classification-store.override.units-stale-only')

      return (
        <StatedState
          actionLabel={ t('classification-store.override.use-key-units') }
          description={ description }
          onAction={ () => { onChange(clearUnits(relation, draft)) } }
          title={ t('classification-store.override.no-units-title') }
        />
      )
    }

    const rows: ISubsetRow[] = [
      ...keyUnits.map((unit) => ({ value: unit.id, label: unit.symbol, detail: unit.id === unit.symbol ? '' : unit.id, stale: false })),
      ...resolved.stale.map((id) => ({ value: id, label: id, detail: '', stale: true }))
    ]

    return (
      <Flex
        gap="small"
        vertical
      >
        <SubsetPicker
          countKey="classification-store.override.units-count"
          onToggle={ (id, checked) => { onChange(toggleUnit(relation, draft, id, checked)) } }
          resolved={ resolved }
          rows={ rows }
          total={ keyUnits.length }
        />
        { clearUnitsAction }
      </Flex>
    )
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      <Text strong>{ t('classification-store.override.unit-heading') }</Text>
      { renderValidUnits() }
      <Flex
        gap="mini"
        vertical
      >
        <Text>{ t('classification-store.override.default-unit') }</Text>
        <Select
          onChange={ (value: string) => { onChange(setDefaultUnit(draft, value === USE_DEFAULT ? undefined : value)) } }
          options={ [
            { value: USE_DEFAULT, label: t('classification-store.override.use-key-default') },
            // The stored default stays visible as itself, so it never reads like the reset choice.
            ...(defaultOutside ? [{ value: String(storedDefault), label: `${String(storedDefault)} (${t('classification-store.override.no-longer-offered')})`, disabled: true }] : []),
            ...choices.map((id) => ({ value: id, label: unitSymbol(relation, id) }))
          ] }
          placeholder={ t('classification-store.override.use-key-default') }
          value={ storedDefault === undefined ? USE_DEFAULT : defaultOutside ? String(storedDefault) : storedDefault }
        />
        { defaultOutside && (
          <StatedState
            actionLabel={ t('classification-store.override.use-key-default') }
            description={ t('classification-store.override.default-outside', { unit: String(storedDefault) }) }
            onAction={ () => { onChange(setDefaultUnit(draft, undefined)) } }
          />
        ) }
      </Flex>
    </Flex>
  )
}

