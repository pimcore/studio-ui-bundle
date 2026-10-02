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
import { DynamicTypePipelineGridTransformersTrimComponent } from './trim'

// `create-styles` transitively pulls in antd-style's ESM build, which jest cannot
// transform. Stub it the same way every `.styles.ts` consumer resolves it.
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

// The real SDK `Select` transitively pulls in the app store/router — none of that is
// relevant to this fix, so stub it with a plain controlled element that still round-trips
// `value`/`onChange` like the real one does.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, onChange, options, ...props }: any) => (
    <select
      { ...props }
      onChange={ (e: any) => { onChange?.(e.target.value) } }
      value={ value ?? '' }
    >
      <option value="" />
      {(options ?? []).map((opt: any) => (
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
// so the actual KeyedList/VirtualItem registration logic this fix depends on is exercised
// unmodified.
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

const initialConfig = {
  transformers: {
    trim: { configOptions: { mode: { options: [{ value: 'all', label: 'All' }, { value: 'characters', label: 'Characters' }] } } }
  }
}

const renderTrim = (props: Pick<KeyedListData, 'onChange'> & { value?: KeyedListData['values'] }): ReturnType<typeof render> => (
  render(
    <ItemProvider item={ { name: ['0', 'config'] } }>
      <PipelineConfigProvider initialConfig={ initialConfig }>
        <KeyedList { ...props }>
          <DynamicTypePipelineGridTransformersTrimComponent />
        </KeyedList>
      </PipelineConfigProvider>
    </ItemProvider>
  )
)

// the KeyedList -> onChange bubble is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

describe('DynamicTypePipelineGridTransformersTrimComponent', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  // regression: adding a Trim transformer and leaving its pre-selected "mode" untouched used
  // to save a config without `mode` at all ("Form.Item initialValue" registers on mount but
  // is folded into the keyed-list baseline, so it never reaches the parent form as a change —
  // see pimcore/platform-version#296 for the first instance of this bug, on the "Simple Field"
  // source field), which then failed the preview/save with "Missing or invalid \"mode\"
  // configuration (must be a string) for trim transformer."
  it('commits the pre-selected mode even without the user touching the select', () => {
    const onChange = jest.fn()

    renderTrim({ onChange })
    flushDebounce()

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ mode: 'all' }))
  })

  it('does not override an already-saved mode with the default', () => {
    const onChange = jest.fn()

    renderTrim({ onChange, value: { mode: 'characters' } })
    flushDebounce()

    onChange.mock.calls.forEach(([reportedValue]) => {
      expect(reportedValue).toEqual(expect.objectContaining({ mode: 'characters' }))
    })
  })
})
