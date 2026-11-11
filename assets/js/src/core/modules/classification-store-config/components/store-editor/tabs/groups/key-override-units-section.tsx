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
  resolveSubset,
  setDefaultUnit,
  publishesUnits,
  toggleUnit,
  unitIdsOf,
  unitsVocabularyKnown
} from './key-override'
import { StatedState, SubsetPicker, type ISectionProps, type ISubsetRow } from './key-override-sections'
import { useKeyUnits } from './use-key-units'

const USE_DEFAULT = ''

export const UnitsSection = ({ relation, draft, onChange }: ISectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { installationUnits, status, unitLabel } = useKeyUnits()
  const known = unitsVocabularyKnown(relation, status === 'ready')
  const keyUnits = unitIdsOf(relation, installationUnits)
  const resolved = resolveSubset(draft.validUnits, keyUnits)
  const choices = defaultUnitChoices(relation, draft, installationUnits)
  const storedDefault = draft.defaultUnit
  const defaultOutside = known && storedDefault !== undefined && !(typeof storedDefault === 'string' && choices.includes(storedDefault))
  // The key's own symbol for the stored default; the reason is only given where the key itself dropped the unit,
  // since otherwise it is this group's subset that excludes it, which the sentence below the control states.
  const storedId = storedDefault === undefined ? '' : typeof storedDefault === 'string' ? storedDefault : JSON.stringify(storedDefault)
  const keyStillOffers = keyUnits.includes(storedId)
  const defaultLabel = keyStillOffers
    ? unitLabel(storedId)
    : `${storedId} (${t('classification-store.override.no-longer-offered')})`
  const clearUnitsAction = (
    <div>
      <IconTextButton
        disabled={ draft.validUnits === undefined || !known }
        icon={ { value: 'clear-filter' } }
        onClick={ () => { onChange(clearUnits(relation, draft, installationUnits)) } }
      >
        { t('classification-store.override.use-key-units') }
      </IconTextButton>
    </div>
  )

  const renderValidUnits = (): React.JSX.Element | null => {
    if (!known) {
      return (
        <Alert
          message={ t(status === 'failed' ? 'classification-store.override.units-unavailable' : 'classification-store.override.units-loading') }
          showIcon
          type={ status === 'failed' ? 'warning' : 'info' }
        />
      )
    }

    // An absent member is read as a null one: the relation names no vocabulary.
    const emptyKey = publishesUnits(relation) && keyUnits.length === 0
    if (!publishesUnits(relation) || emptyKey) {
      const notice = !publishesUnits(relation)
        ? 'classification-store.override.units-no-vocabulary'
        : relation.units?.validUnits === null || relation.units?.validUnits === undefined
          ? 'classification-store.override.units-installation-empty'
          : 'classification-store.override.units-key-permits-none'

      return (
        <Flex
          gap="mini"
          vertical
        >
          <Alert
            message={ t(notice) }
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
          onAction={ () => { onChange(clearUnits(relation, draft, installationUnits)) } }
          title={ t('classification-store.override.no-units-title') }
        />
      )
    }

    const rows: ISubsetRow[] = [
      ...keyUnits.map((id) => ({ value: id, label: unitLabel(id), detail: id === unitLabel(id) ? '' : id, stale: false })),
      ...resolved.stale.map((id) => ({ value: id, label: id, detail: '', stale: true }))
    ]

    return (
      <Flex
        gap="small"
        vertical
      >
        <SubsetPicker
          countKey="classification-store.override.units-count"
          onToggle={ (id, checked) => { onChange(toggleUnit(relation, draft, id, checked, installationUnits)) } }
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
            ...(!known && storedDefault !== undefined ? [{ value: storedId, label: storedId, disabled: true }] : []),
            ...(defaultOutside ? [{ value: storedId, label: defaultLabel, disabled: true }] : []),
            ...choices.map((id) => ({ value: id, label: unitLabel(id) }))
          ] }
          placeholder={ t('classification-store.override.use-key-default') }
          value={ storedDefault === undefined ? USE_DEFAULT : defaultOutside || !known ? storedId : storedDefault }
        />
        { defaultOutside && (
          <StatedState
            actionLabel={ t('classification-store.override.use-key-default') }
            description={ t('classification-store.override.default-outside', { unit: unitLabel(storedId) }) }
            onAction={ () => { onChange(setDefaultUnit(draft, undefined)) } }
          />
        ) }
      </Flex>
    </Flex>
  )
}

