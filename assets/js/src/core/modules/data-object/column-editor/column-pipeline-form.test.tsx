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
import { render, screen } from '@testing-library/react'
import { ColumnPipelineForm } from './column-pipeline-form'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style's createStyles reaches its untranspiled ESM core under Jest; stub it the same
// way every `.styles.ts` consumer resolves it, the same as simple-field.test.tsx does.
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

// `Form.Item`'s full implementation (via the `@Pimcore/components/form/form` barrel)
// transitively pulls in localized-fields -> the whole app shell/router, which jest can't
// load. Rebuild the real composition minus `withLocalizedFieldsLocale` (the HOC responsible
// for that pull-in), the same way simple-field.test.tsx does, so the real KeyedList/Item
// registration this test depends on is exercised unmodified.
jest.mock('@Pimcore/components/form/form', () => {
  const { compose } = jest.requireActual('@reduxjs/toolkit')
  const { Form: AntForm } = jest.requireActual('antd')
  const { withGroupName } = jest.requireActual('@Pimcore/components/form/item/with-group-name')
  const { withKeyedItemContext } = jest.requireActual('@Pimcore/components/form/item/with-keyed-item-context')
  const { withNumberedItemContext } = jest.requireActual('@Pimcore/components/form/item/with-numbered-item-context')
  const { withItemProvider } = jest.requireActual('@Pimcore/components/form/item/with-item-provider')
  const { Group } = jest.requireActual('@Pimcore/components/form/group/group')

  const Item = compose(withGroupName, withKeyedItemContext, withNumberedItemContext, withItemProvider)(AntForm.Item)

  return { Form: Object.assign(AntForm, { Item, Group }) }
})

// Mirrors simple-field.test.tsx's stub: the real SDK `Select` transitively pulls in the
// app store/router via its `.styles.ts`, none of which is relevant to the provider-wiring
// bug under test here.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, onChange, onSelect, options, showSearch, ...props }: any) => (
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

jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/input/input', () => ({ Input: (props: any) => <input { ...props } /> }))
jest.mock('@Pimcore/components/tabs/tabs', () => ({
  Tabs: ({ items }: any) => (
    <div data-testid='tabs-layout'>
      { (items ?? []).map((item: any) => <div key={ item.key }>{ item.label }{ item.children }</div>) }
    </div>
  )
}))
jest.mock('@Pimcore/components/split-layout/split-layout', () => ({
  SplitLayout: ({ leftItem, rightItem }: any) => (
    <div data-testid='split-layout'>{ leftItem?.children }{ rightItem?.children }</div>
  )
}))
jest.mock('./column-preview', () => ({ ColumnPreview: () => <div data-testid='column-preview' /> }))

// The real `ClassificationStoreModalProvider`/`useClassificationStoreModal` transitively pull
// the classification store modal UI (tabs, pagination, the generated API slice, ...) which in
// turn reaches the app shell/store - none of which this test exercises. Only the picker
// *context* wiring (`ClassificationStoreFieldPickerProvider`) is under test here, so stub the
// modal launcher itself the same way simple-field.test.tsx stubs the unrelated value control.
jest.mock(
  '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider',
  () => ({
    ClassificationStoreModalProvider: (
      { children }: { children: React.ReactNode }
    ) => <>{ children }</>,
    useClassificationStoreModal: () => ({
      openModal: jest.fn(),
      closeModal: jest.fn(),
      fireUpdateEvent: jest.fn()
    })
  })
)

// `Pipeline.DynamicGroupItem` is how Studio mounts a registered source-field/transformer
// dynamic type; the real implementation resolves the dynamic type through a DI-backed
// registry, which is unrelated to the provider-wiring bug under test. Replace it with a
// minimal stand-in that, for the `sourceFields` group, mounts the real "Simple field" source
// field component exactly the way the real `Pipeline` does (nested in `ItemProvider` +
// `KeyedList`) - the same core Studio grid source-field dynamic type named in the bug report.
jest.mock('@Pimcore/components/pipeline/pipeline', () => {
  const ReactActual = jest.requireActual('react')
  const { ItemProvider: RealItemProvider } = jest.requireActual(
    '@Pimcore/components/form/item/provider/item/item-provider'
  )
  const { KeyedList: RealKeyedList } = jest.requireActual(
    '@Pimcore/components/form/controls/keyed-list/keyed-list'
  )
  const { DynamicTypePipelineGridSourceFieldsSimpleFieldComponent: RealSimpleField } = jest.requireActual(
    '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/components/simple-field/simple-field'
  )

  const FakePipeline = ({ items }: any): React.JSX.Element => (
    <>
      {(items ?? []).map((item: any) => (
        <ReactActual.Fragment key={ item.id }>
          { item.component }
        </ReactActual.Fragment>
      ))}
    </>
  )

  function FakePipelineCustomItem ({ children }: any): React.JSX.Element {
    return <>{ children }</>
  }

  function FakePipelineDynamicGroupItem ({ id }: { id: string }): React.JSX.Element | null {
    if (id !== 'sourceFields') return null

    return (
      <RealItemProvider item={ { name: ['0', 'config'] } }>
        <RealKeyedList
          onChange={ () => {} }
          value={ {} }
        >
          <RealSimpleField />
        </RealKeyedList>
      </RealItemProvider>
    )
  }

  FakePipeline.CustomItem = FakePipelineCustomItem
  FakePipeline.DynamicGroupItem = FakePipelineDynamicGroupItem

  return { Pipeline: FakePipeline }
})

const sourceFieldConfig = { simpleField: [{ key: 'id', name: 'ID' }, { key: 'name', name: 'Name' }] }

describe('ColumnPipelineForm', () => {
  // Regression test: adding an advanced column and choosing the core Studio grid
  // "Simple field" source-field dynamic type used to crash BaseColumnEditor with
  // "useClassificationStoreFieldPicker must be used within a
  // ClassificationStoreFieldPickerProvider", because the pipeline form never supplied that
  // provider (Studio's own AdvancedColumnForm does). `SimpleField` always calls
  // `useClassificationStoreFieldActions` -> `useClassificationStoreFieldPicker`, even for a
  // plain (non-classification-store) field, so mounting it here without the fix throws.
  it('renders a "Simple field" source field without the ClassificationStoreFieldPicker crash', () => {
    expect(() => {
      render(
        <ColumnPipelineForm
          classDefinitionId='CAR'
          config={ sourceFieldConfig }
          sourceFieldsRegistryId='sourceFields'
          transformersRegistryId='transformers'
        />
      )
    }).not.toThrow()

    // The "Simple field" source field mounted and rendered its field picker (options sourced
    // from the pipeline config), proving the tree beneath `ColumnPipelineForm` has access to
    // `useClassificationStoreFieldPicker` rather than having crashed before reaching this point.
    expect(screen.getByText('field')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'ID' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument()
  })

  describe('compact layout', () => {
    it('lays source fields and transformers out side by side (SplitLayout) by default', () => {
      render(
        <ColumnPipelineForm
          classDefinitionId='CAR'
          config={ sourceFieldConfig }
          sourceFieldsRegistryId='sourceFields'
          transformersRegistryId='transformers'
        />
      )

      expect(screen.getByTestId('split-layout')).toBeInTheDocument()
      expect(screen.queryByTestId('tabs-layout')).not.toBeInTheDocument()
    })

    it('switches source fields and transformers into tabs when compact', () => {
      render(
        <ColumnPipelineForm
          classDefinitionId='CAR'
          compact
          config={ sourceFieldConfig }
          sourceFieldsRegistryId='sourceFields'
          transformersRegistryId='transformers'
        />
      )

      expect(screen.getByTestId('tabs-layout')).toBeInTheDocument()
      expect(screen.queryByTestId('split-layout')).not.toBeInTheDocument()
      expect(screen.getByText('column-editor.pipeline.sourceFields')).toBeInTheDocument()
      expect(screen.getByText('column-editor.pipeline.transformers')).toBeInTheDocument()
    })
  })
})
