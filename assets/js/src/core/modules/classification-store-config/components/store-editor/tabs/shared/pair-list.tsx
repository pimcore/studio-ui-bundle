/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Alert } from '@Pimcore/components/alert/alert'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Input } from '@Pimcore/components/input/input'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { Tag } from '@Pimcore/components/tag/tag'
import { Text } from '@Pimcore/components/text/text'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import {
  buildMap,
  jsonTypeOf,
  type PairError,
  type PairMap,
  type PairRow,
  type PairView,
  rowErrors,
  toRows,
  wouldBeList
} from './pairs'

const PREVIEW_LENGTH = 40
const TYPE_COLUMN_WIDTH = 72

export interface PairListHandle {
  /** The next map, or undefined when a row is invalid and nothing may be sent. */
  collect: () => { next: PairMap | null } | undefined
}

interface IPairListProps {
  value: object | null | undefined
  view: PairView
  hint?: string
  onDirtyChange: (dirty: boolean) => void
}

const preview = (value: unknown): string => {
  const json = JSON.stringify(value)

  return json.length > PREVIEW_LENGTH ? `${json.slice(0, PREVIEW_LENGTH)}…` : json
}

export const PairList = forwardRef<PairListHandle, IPairListProps>(({ value, view, hint, onDirtyChange }, ref) => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const [form] = Form.useForm<{ pairs: PairRow[] }>()
  const scrollRef = useRef<HTMLDivElement>(null)
  // Header and every row share these columns: key, value, remove.
  const rowGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `minmax(0, 1fr) minmax(0, 1fr) ${token.controlHeight}px`,
    columnGap: token.marginXS,
    alignItems: 'start'
  }

  // The untouched original stays beside the form state: read-only rows are carried from it.
  const [original] = useState<PairMap | null>(() => (value ?? null) as PairMap | null)
  const [initialRows] = useState<PairRow[]>(() => toRows(value, view))
  const [initialJson] = useState<string>(() => JSON.stringify(initialRows))
  const [attempted, setAttempted] = useState(false)

  const watched = Form.useWatch('pairs', { form, preserve: true }) as PairRow[] | undefined
  const rows = watched ?? initialRows
  const errors = rowErrors(rows, original, view)
  const listShaped = wouldBeList(rows, original, view)

  useEffect(() => {
    onDirtyChange(JSON.stringify(rows) !== initialJson)
  }, [rows, initialJson, onDirtyChange])

  useImperativeHandle(ref, () => ({
    collect: () => {
      const current = (form.getFieldValue('pairs') ?? []) as PairRow[]
      const currentErrors = rowErrors(current, original, view)
      const first = currentErrors.findIndex((entry) => entry.key !== undefined || entry.value !== undefined)

      setAttempted(true)

      // A list-shaped key set is refused even when no editable row carries the message.
      if (first === -1 && wouldBeList(current, original, view)) return undefined

      if (first !== -1) {
        scrollRef.current?.querySelectorAll('[data-pair-row]')[first]?.scrollIntoView?.({ block: 'nearest' })
        return undefined
      }

      return { next: buildMap(current, original, view) }
    }
  }), [form, original, view])

  const handleAdd = (): void => {
    const current = (form.getFieldValue('pairs') ?? []) as PairRow[]

    form.setFieldValue('pairs', [...current, { key: '', value: '', readOnly: false }])
  }

  // A missing key or value is reported once a save was tried; a clash is reported as it is typed.
  const messageOf = (error: PairError | undefined): string | undefined => {
    if (error === undefined) return undefined
    if ((error === 'key-required' || error === 'value-required') && !attempted) return undefined

    return {
      'key-required': t('form.validation.required'),
      'value-required': t('form.validation.required'),
      duplicate: t(view.duplicateMessage),
      list: t('classification-store.pair-key-list')
    }[error]
  }

  const renderReadOnly = (row: PairRow): React.JSX.Element => {
    const stored = original?.[row.storedKey!]

    return (
      <>
        <Text
          ellipsis
          style={ { paddingInline: token.controlPaddingHorizontal, lineHeight: `${token.controlHeight}px` } }
        >
          {row.key}
        </Text>
        <Flex
          align="center"
          gap="small"
          style={ { minHeight: token.controlHeight, minWidth: 0 } }
        >
          <Flex
            justify="start"
            style={ { flex: 'none', width: TYPE_COLUMN_WIDTH } }
          >
            <Tag style={ { margin: 0 } }>{t(`classification-store.pair-type.${jsonTypeOf(stored)}`)}</Tag>
          </Flex>
          <Tooltip
            placement="bottomLeft"
            title={ <pre style={ { margin: 0 } }>{JSON.stringify(stored, null, 2)}</pre> }
          >
            <Text
              ellipsis
              style={ { flex: 1, minWidth: 0 } }
              type="secondary"
            >
              {preview(stored)}
            </Text>
          </Tooltip>
        </Flex>
      </>
    )
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      { hint !== undefined && (
        <Alert
          message={ hint }
          showIcon
          type="info"
        />
      ) }

      { listShaped && !errors.some((rowError) => rowError.key === 'list') && (
        <Alert
          message={ t('classification-store.pair-key-list') }
          showIcon
          type="error"
        />
      ) }

      <Form
        form={ form }
        initialValues={ { pairs: initialRows } }
        layout="vertical"
      >
        <div style={ { ...rowGridStyle, paddingBottom: token.paddingXXS } }>
          <Text strong>{t(view.keyLabel)}</Text>
          <Text strong>{t(view.valueLabel)}</Text>
          <span />
        </div>

        <div
          data-testid="pair-scroll"
          ref={ scrollRef }
          style={ { maxHeight: 'max(120px, calc(60vh - 200px))', overflowY: 'auto' } }
        >
          { rows.length === 0 && <NoContent text={ t('classification-store.pair-no-content') } /> }
          <Form.List name="pairs">
            { (fields, { remove }) => (
              <>
                { fields.map((field, index) => {
                  const row = rows[index]
                  const rowError = errors[index] ?? {}
                  const keyMessage = messageOf(rowError.key)
                  const valueMessage = messageOf(rowError.value)

                  return (
                    <div
                      data-pair-row
                      key={ field.key }
                      style={ { ...rowGridStyle, marginBottom: token.marginXS } }
                    >
                      { row?.readOnly
                        ? renderReadOnly(row)
                        : (
                          <>
                            <Form.Item
                              help={ keyMessage }
                              name={ [field.name, 'key'] }
                              style={ { marginBottom: 0 } }
                              validateStatus={ keyMessage !== undefined ? 'error' : undefined }
                            >
                              <Input aria-label={ t(view.keyLabel) } />
                            </Form.Item>
                            <Form.Item
                              help={ valueMessage }
                              name={ [field.name, 'value'] }
                              style={ { marginBottom: 0 } }
                              validateStatus={ valueMessage !== undefined ? 'error' : undefined }
                            >
                              <Input aria-label={ t(view.valueLabel) } />
                            </Form.Item>
                          </>
                          ) }
                      <IconButton
                        aria-label={ t('classification-store.aria.remove-pair', { name: row?.key ?? '' }) }
                        icon={ { value: 'close' } }
                        onClick={ () => { remove(field.name) } }
                        tooltip={ { title: t('remove') } }
                      />
                    </div>
                  )
                }) }
              </>
            ) }
          </Form.List>
        </div>

        <IconTextButton
          icon={ { value: 'new' } }
          onClick={ handleAdd }
        >
          {t('classification-store.add-pair')}
        </IconTextButton>
      </Form>
    </Flex>
  )
})

PairList.displayName = 'PairList'
