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
import { act, render } from '@testing-library/react'
import { KeyedList } from '@Pimcore/components/form/controls/keyed-list/keyed-list'
import { type KeyedListData } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { PipelineConfigProvider } from '@Pimcore/components/pipeline/provider/pipeline-config/pipeline-config-provider'
import { DynamicTypePipelineGridSourceFieldsSimpleFieldComponent } from './simple-field'

// `create-styles` transitively pulls in antd-style's ESM build, which jest cannot
// transform. Stub it the same way every `.styles.ts` consumer resolves it, so the real
// VirtualItem/KeyedList machinery below can render without dragging that in.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({
    styles: new Proxy({}, { get: () => '' }),
    cx: (...args: any[]) => args.filter(Boolean).join(' '),
    theme: {}
  }),
  css: () => '',
  cx: (...args: any[]) => args.filter(Boolean).join(' '),
  keyframes: () => ''
}))

// The classification-store picker (modal, Redux-backed) is unrelated to the bug under
// test (the plain "simple field" default-selection commit) — stub it out like a sibling
// dependency, the same way `simple-field.tsx` itself only reaches it through this hook.
jest.mock('../../classification-store/classification-store-value-control', () => ({
  ClassificationStoreValueControl: () => null,
  useClassificationStoreFieldActions: () => ({ onFieldSelect: jest.fn(), clearValue: jest.fn(), openFor: jest.fn() })
}))

// The real SDK `Select` transitively pulls in the app store/router (via its `.styles.ts`
// -> date-time util -> auth slice -> router -> antd table style, another untransformed
// ESM build) — none of that is relevant to this fix, so stub it with a plain controlled
// element that still round-trips `value`/`onChange`/`onSelect` like the real one does.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, onChange, onSelect, options, ...props }: any) => (
    <select
      { ...props }
      onChange={ (e: any) => {
        onChange?.(e.target.value)
        onSelect?.(e.target.value)
      } }
      value={ value ?? '' }
    >
      <option value="" />
      {(options ?? []).flatMap((opt: any) => opt.options ?? [opt]).map((opt: any) => (
        <option
          key={ opt.value }
          value={ opt.value }
        >{opt.label}
        </option>
      ))}
    </select>
  )
}))

// `Form.Item`'s full implementation (via the `@Pimcore/components/form/form` barrel)
// transitively pulls in localized-fields -> the whole app shell/router, which jest can't
// load either. Rebuild the real `Form.Item` composition minus `withLocalizedFieldsLocale`
// (the HOC responsible for that pull-in) so the actual KeyedList/VirtualItem registration
// logic this fix depends on is exercised unmodified.
jest.mock('@Pimcore/components/form/form', () => {
  const { compose } = jest.requireActual('@reduxjs/toolkit')
  const { Form: AntForm } = jest.requireActual('antd')
  const { withGroupName } = jest.requireActual('@Pimcore/components/form/item/with-group-name')
  const { withKeyedItemContext } = jest.requireActual('@Pimcore/components/form/item/with-keyed-item-context')
  const { withNumberedItemContext } = jest.requireActual('@Pimcore/components/form/item/with-numbered-item-context')
  const { withItemProvider } = jest.requireActual('@Pimcore/components/form/item/with-item-provider')
  const { Group } = jest.requireActual('@Pimcore/components/form/group/group')

  const Item = compose(withGroupName, withKeyedItemContext, withNumberedItemContext, withItemProvider)(AntForm.Item)

  return { Form: { Item, Group } }
})

const initialConfig = { simpleField: [{ key: 'id', name: 'ID' }, { key: 'name', name: 'Name' }] }

const renderSimpleField = (props: Pick<KeyedListData, 'onChange'> & { value?: KeyedListData['values'] }): ReturnType<typeof render> => (
  render(
    <ItemProvider item={ { name: ['0', 'config'] } }>
      <PipelineConfigProvider initialConfig={ initialConfig }>
        <KeyedList { ...props }>
          <DynamicTypePipelineGridSourceFieldsSimpleFieldComponent />
        </KeyedList>
      </PipelineConfigProvider>
    </ItemProvider>
  )
)

// the KeyedList -> onChange bubble is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

describe('DynamicTypePipelineGridSourceFieldsSimpleFieldComponent', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  // regression pimcore/platform-version#296: the pre-selected first source field option
  // was dropped from the saved advanced-column config unless the user actively re-picked
  // it (antd only commits `initialValue` to form state on a real onChange).
  it('commits the pre-selected first source field even without the user touching the select', () => {
    const onChange = jest.fn()

    renderSimpleField({ onChange })
    flushDebounce()

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ field: 'id' }))
  })

  it('does not override an already-saved field selection with the first option', () => {
    const onChange = jest.fn()

    renderSimpleField({ onChange, value: { field: 'name' } })
    flushDebounce()

    onChange.mock.calls.forEach(([reportedValue]) => {
      expect(reportedValue).toEqual(expect.objectContaining({ field: 'name' }))
    })
  })
})
