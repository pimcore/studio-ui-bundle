/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

/**
 * What the editor of a `multiValue` key renders for each declaration, and what it writes back. The
 * delegate's own widget is a stand-in bound to the `value` member of its entry, the way the real
 * one is bound by the form item; everything between it and the emitted list is the real editor.
 */

// the form barrel reaches antd-style's untranspiled ESM; the editor needs the list and its group only
jest.mock('@Pimcore/components/form/form', () => ({
  // getters, because the list itself imports this barrel while it is being loaded
  Form: {
    get Group () { return jest.requireActual('@Pimcore/components/form/group/group').Group },
    get NumberedList () { return jest.requireActual('@Pimcore/components/form/controls/numbered-list/numbered-list').NumberedList }
  }
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => params === undefined ? key : `${key}:${JSON.stringify(params)}`
  })
}))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tag/tag', () => ({ Tag: ({ children }: any) => <em>{children}</em> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <p>{children}</p> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: any) => <h5>{children}</h5> }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ tooltip, onClick, disabled }: any) => (
    <button
      aria-label={ tooltip.title }
      disabled={ disabled }
      onClick={ onClick }
      type='button'
    />
  )
}))

const mockUnregistered = 'somethingUnknown'

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({
    hasDynamicType: (id: string) => id !== mockUnregistered,
    // numeric reads what parses as a finite number, every other type reads everything
    getDynamicType: (id: string) => ({
      canReadValue: (value: unknown) => id !== 'numeric' || value === null || value === undefined || value === '' ||
        ((typeof value === 'number' || typeof value === 'string') && Number.isFinite(Number(value)))
    })
  })
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry' }
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component', () => {
  const { useEffect } = jest.requireActual('react')
  const { useFormGroupOptional } = jest.requireActual('@Pimcore/components/form/group/provider/use-form-group-optional')
  const { useNumberedList } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list')

  // binds to the `value` member of the entry its group names, registering null as the form item does
  const DataComponent = (props: any): React.JSX.Element => {
    const path = [...(useFormGroupOptional().name as string[]), props.name]
    const { values, operations } = useNumberedList()
    const current = operations.getValue(path)

    useEffect(() => {
      if (current === undefined) {
        operations.update(path, null, true)
      }
    }, [current])

    return (
      <input
        aria-label={ `entry-${String(path[path.length - 2])}` }
        data-count={ values.length }
        data-fieldtype={ props.fieldType }
        onChange={ (event) => { operations.update(path, event.target.value) } }
        value={ current ?? '' }
      />
    )
  }

  return { DataComponent }
})

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
// eslint-disable-next-line import/first
import { MultiValueEditor, type MultiValueEditorProps } from './multi-value-editor'
// eslint-disable-next-line import/first
import { type ClassificationStoreMultiValueEntry } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

const ADD = 'add'
const DEFAULT_HEADING = 'classification-store.multi-value.default-variant'
const MOVE_UP = 'classification-store.multi-value.move-up'
const MOVE_DOWN = 'classification-store.multi-value.move-down'
const REMOVE = 'delete'
const METRIC = 'metric'
const IMPERIAL = 'imperial'

let onChange: jest.Mock<void, [ClassificationStoreMultiValueEntry[]]>

const renderEditor = (props: Partial<MultiValueEditorProps> = {}): ReturnType<typeof render> => render(
  <ItemProvider item={ { name: 'height' } }>
    <MultiValueEditor
      delegateDatatype='quantityValue'
      onChange={ onChange }
      variants={ null }
      { ...props }
    />
  </ItemProvider>
)

const lastEmitted = async (): Promise<ClassificationStoreMultiValueEntry[]> => {
  await waitFor(() => { expect(onChange).toHaveBeenCalled() })

  return onChange.mock.calls[onChange.mock.calls.length - 1][0]
}

const inputs = (): HTMLElement[] => screen.queryAllByRole('textbox')

const valuesOf = (): string[] => inputs().map((input) => (input as HTMLInputElement).value)

// the list reports through a debounce, and the report renders again: what the user sees is what stands after that
const settled = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 50)) }

describe('MultiValueEditor', () => {
  beforeEach(() => { onChange = jest.fn() })

  it('renders exactly one input, the delegate widget, for a key declaring no variants', () => {
    renderEditor({ value: [{ v: 'a' }] })

    expect(inputs()).toHaveLength(1)
    expect(inputs()[0]).toHaveAttribute('data-fieldtype', 'quantityValue')
    // a slot holds one value: nothing is added to it
    expect(screen.queryByText(ADD)).toBeNull()
    expect(screen.getAllByLabelText(REMOVE)).toHaveLength(1)
  })

  it('renders one input per declared variant, in declared order, labelled by label or by name', () => {
    renderEditor({
      variants: [{ name: 'metric' }, { name: 'imperial', label: 'Imperial' }],
      value: [{ var: 'imperial', v: '1 ft' }, { var: 'metric', v: '30 cm' }]
    })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric', 'Imperial', DEFAULT_HEADING])
    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['30 cm', '1 ft', ''])
  })

  it('does not report opening a key whose variant slots hold nothing yet as a change, and tags the first value written', async () => {
    renderEditor({ variants: [{ name: 'metric' }, { name: 'imperial' }], value: [{ var: 'metric', v: '30 cm' }] })

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(onChange).not.toHaveBeenCalled()

    fireEvent.change(inputs()[1], { target: { value: '1 ft' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: '30 cm' }, { var: 'imperial', v: '1 ft' }])
  })

  it('treats null and an empty list of variants alike', () => {
    const rendered = [null, []].map((variants) => {
      const { container, unmount } = renderEditor({ variants, value: [{ v: 'a' }] })
      const html = container.innerHTML

      unmount()

      return html
    })

    expect(rendered[0]).toBe(rendered[1])
    expect(screen.queryAllByRole('heading')).toHaveLength(0)
  })

  it('never computes or offers to compute one variant from another', async () => {
    renderEditor({
      variants: [{ name: 'metric' }, { name: 'imperial' }],
      value: [{ var: 'metric', v: '30 cm' }, { var: 'imperial', v: '1 ft' }]
    })

    fireEvent.change(inputs()[0], { target: { value: '31 cm' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: '31 cm' }, { var: 'imperial', v: '1 ft' }])
    expect(screen.queryByText(/convert|sync|calculate|derive|suggest/i)).toBeNull()
    expect(screen.queryByLabelText(/convert|sync|calculate|derive|suggest/i)).toBeNull()
  })

  // A slot holds one value, so what is written carries no position.
  it('writes no position on any entry', async () => {
    renderEditor({ variants: [{ name: METRIC }, { name: IMPERIAL }], value: [{ var: METRIC, v: 'a' }, { var: IMPERIAL, v: 'b' }] })

    fireEvent.change(inputs()[1], { target: { value: 'c' } })

    expect((await lastEmitted()).map((entry) => 'p' in entry)).toEqual([false, false])
  })

  // The first character written into a seeded slot is the moment the control holds something the
  // stored value does not: the row has to stand on what it wrote until the value comes back with it.
  it('keeps a slot being typed into for a key that holds nothing yet', async () => {
    renderEditor({
      delegateDatatype: 'numeric',
      variants: [{ name: METRIC }, { name: IMPERIAL }],
      value: undefined
    })

    await settled()

    fireEvent.change(inputs()[0], { target: { value: '10' } })

    expect(await lastEmitted()).toEqual([{ var: METRIC, v: '10' }])
    await settled()
    expect(valuesOf()).toEqual(['10', '', ''])
  })

  it('keeps what is written into a seeded slot after the value came back', async () => {
    const tree = (value: unknown): React.JSX.Element => (
      <ItemProvider item={ { name: 'height' } }>
        <MultiValueEditor
          delegateDatatype='quantityValue'
          onChange={ onChange }
          value={ value }
          variants={ [{ name: METRIC }] }
        />
      </ItemProvider>
    )
    const { rerender } = render(tree([]))

    fireEvent.change(inputs()[0], { target: { value: '30' } })
    expect(await lastEmitted()).toEqual([{ var: METRIC, v: '30' }])

    rerender(tree(await lastEmitted()))
    await settled()

    fireEvent.change(inputs()[0], { target: { value: '30 cm' } })

    await settled()
    expect(await lastEmitted()).toEqual([{ var: METRIC, v: '30 cm' }])
    expect(valuesOf()).toEqual(['30 cm', ''])
  })

  it('shows an undeclared variant as not declared and the variant-less entry in a default slot, dropping neither', async () => {
    renderEditor({
      variants: [{ name: 'metric' }],
      value: [{ var: 'metric', v: 'm' }, { var: 'legacy', v: 'l' }, { v: 'd' }]
    })

    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent)

    expect(headings).toEqual(['metric', DEFAULT_HEADING, 'legacy'])
    expect(headings[1]).not.toBe('metric')
    expect(screen.getByText('classification-store.multi-value.not-declared')).toBeInTheDocument()
    expect(inputs()).toHaveLength(3)

    fireEvent.change(inputs()[0], { target: { value: 'm2' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: 'm2' }, { var: 'legacy', v: 'l' }, { v: 'd' }])
  })

  it('shows a declined default slot that holds a value as not declared, and writes the entry back unchanged', async () => {
    renderEditor({ variants: [{ name: 'metric' }], defaultVariant: false, value: [{ v: 'd' }] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent))
      .toEqual(['metric', DEFAULT_HEADING])
    expect(screen.getByText('classification-store.multi-value.not-declared')).toBeInTheDocument()
    // the seeded metric slot, then the default slot holding the value
    expect(valuesOf()).toEqual(['', 'd'])

    fireEvent.change(inputs()[1], { target: { value: 'd2' } })

    expect(await lastEmitted()).toEqual([{ v: 'd2' }])
  })

  it('offers no default slot for a declined default variant with nothing stored in it', () => {
    renderEditor({ variants: [{ name: 'metric' }], defaultVariant: false, value: [] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric'])
    expect(inputs()).toHaveLength(1)
  })

  it('adds the default slot after a declared variant for a key that permits it, headed by its label', () => {
    renderEditor({ variants: [{ name: 'metric' }], defaultVariantLabel: 'Base', value: [] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric', 'Base'])
    expect(screen.queryByText('classification-store.multi-value.not-declared')).not.toBeInTheDocument()
    expect(inputs()).toHaveLength(2)
  })

  it('adds the default slot after the declared variants for a key that declares no label for it', async () => {
    renderEditor({ variants: [{ name: METRIC }], value: [{ var: METRIC, v: 'm' }] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual([METRIC, DEFAULT_HEADING])

    fireEvent.change(inputs()[1], { target: { value: 'd' } })

    expect(await lastEmitted()).toEqual([{ var: METRIC, v: 'm' }, { v: 'd' }])
  })

  it('heads the default slot with the declared label', () => {
    renderEditor({ variants: [{ name: 'metric' }], defaultVariantLabel: 'Base', value: [{ v: 'd' }] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric', 'Base'])
  })

  it('offers a clear action on every entry, and none to add or move', async () => {
    renderEditor({ variants: [{ name: 'metric' }], value: [{ var: 'metric', v: 'm' }, { v: 'd' }] })

    expect(screen.getAllByLabelText(REMOVE)).toHaveLength(2)
    expect(screen.queryByLabelText(MOVE_UP)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(MOVE_DOWN)).not.toBeInTheDocument()
    expect(screen.queryByText(ADD)).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByLabelText(REMOVE)[0])

    expect(await lastEmitted()).toEqual([{ v: 'd' }])
    expect(inputs()).toHaveLength(2)
  })

  it('offers no clear action when the key is not editable', () => {
    renderEditor({ noteditable: true, value: [{ v: 'd' }] })

    expect(screen.queryByLabelText(REMOVE)).not.toBeInTheDocument()
  })

  it('drops the slot of an undeclared variant with its last entry, and its tag', async () => {
    renderEditor({ variants: [{ name: 'metric' }], value: [{ var: 'legacy', v: 'l' }] })

    expect(screen.getByText('classification-store.multi-value.not-declared')).toBeInTheDocument()

    // after the metric slot and the default slot the key permits
    fireEvent.click(screen.getAllByLabelText(REMOVE)[2])

    expect(await lastEmitted()).toEqual([])
    expect(screen.queryByText('classification-store.multi-value.not-declared')).not.toBeInTheDocument()
  })

  it('shows an entry the delegate cannot read as a line, keeps it in the payload and writes nothing on render', async () => {
    renderEditor({
      delegateDatatype: 'numeric',
      variants: [{ name: METRIC }, { name: IMPERIAL }],
      value: [{ var: METRIC, v: 'Unit 1' }, { var: IMPERIAL, v: '20' }, { v: 20 }]
    })

    expect(screen.getByText('Unit 1')).toBeInTheDocument()
    expect(screen.getByText('classification-store.multi-value.unreadable-entry')).toBeInTheDocument()
    expect(inputs()).toHaveLength(2)
    expect(onChange).not.toHaveBeenCalled()

    fireEvent.change(inputs()[0], { target: { value: '21' } })

    expect(await lastEmitted()).toEqual([{ var: METRIC, v: 'Unit 1' }, { var: IMPERIAL, v: '21' }, { v: 20 }])
  })

  it('renders an object or list value in the delegate widget of a type that reads every value', () => {
    renderEditor({
      delegateDatatype: 'quantityValue',
      variants: [{ name: METRIC }],
      value: [{ var: METRIC, v: { value: 30, unitId: 1 } }, { v: [['a']] }]
    })

    expect(screen.queryByText('classification-store.multi-value.unreadable-entry')).not.toBeInTheDocument()
    expect(inputs()).toHaveLength(2)
  })

  // A declared row with no name addresses nothing, so it is no slot of its own; what it must never
  // become is a second unheaded slot beside the default one, or one headed by nothing.
  it('declares no slot for a variant row carrying no name', () => {
    renderEditor({ variants: [{ name: 'metric' }, {} as any], value: [{ var: 'metric', v: 'm' }] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric', DEFAULT_HEADING])
    expect(inputs()).toHaveLength(2)
  })

  it('renders the one unheaded slot of a key whose every variant row carries no name', () => {
    renderEditor({ variants: [{} as any], value: [{ v: 'd' }] })

    expect(screen.queryAllByRole('heading')).toHaveLength(0)
    expect(inputs()).toHaveLength(1)
  })

  // Stored data outranks the declaration, so one slot can hold two values. Each is its own row:
  // keyed by the slot alone they were one child twice over.
  it('keys apart two stored values of one slot', () => {
    const duplicateKeys = jest.spyOn(console, 'error').mockImplementation(() => {})

    renderEditor({
      variants: [{ name: 'metric' }],
      value: [{ var: 'metric', v: 'a' }, { var: 'metric', v: 'b' }]
    })

    // the two stored values of the metric slot, then the empty default slot
    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['a', 'b', ''])
    expect(duplicateKeys.mock.calls.map((call) => String(call[0])).join('')).not.toMatch(/same key/)
    duplicateKeys.mockRestore()
  })

  it.each(['a', { v: 'a' }, 3])('states that a stored value %p cannot be read, rendering no input and writing nothing', (value) => {
    renderEditor({ value })

    expect(screen.getByText('classification-store.multi-value.unreadable-value')).toBeInTheDocument()
    expect(inputs()).toHaveLength(0)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('treats a nil stored value as no value, not as an unreadable one', () => {
    renderEditor({ value: null })

    expect(screen.queryByText('classification-store.multi-value.unreadable-value')).not.toBeInTheDocument()
    expect(valuesOf()).toEqual([''])
  })

  it('reads no position off a list element holding nothing, and keeps the entries around it', () => {
    renderEditor({ variants: [{ name: METRIC }], value: [{ var: METRIC, v: 'a' }, null as any, { v: 'b' }] })

    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['a', 'b'])
  })

  it('states that the key has no type when the delegate is null, rendering no input', () => {
    renderEditor({ delegateDatatype: null })

    expect(screen.getByText('classification-store.multi-value.no-delegate')).toBeInTheDocument()
    expect(inputs()).toHaveLength(0)
  })

  it.each([mockUnregistered, 'multiValue', 'encryptedField'])('names the delegate type %s when the editor has no widget for it', (type) => {
    renderEditor({ delegateDatatype: type })

    expect(within(document.body).getByText(/unknown-delegate/)).toHaveTextContent(type)
    expect(inputs()).toHaveLength(0)
  })
})
