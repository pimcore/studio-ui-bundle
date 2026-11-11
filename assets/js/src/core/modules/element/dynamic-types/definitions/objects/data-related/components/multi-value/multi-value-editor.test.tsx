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
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick, disabled }: any) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
      type='button'
    >
      {children}
    </button>
  )
}))

const mockUnregistered = 'somethingUnknown'

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ hasDynamicType: (id: string) => id !== mockUnregistered })
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
const MOVE_UP = 'classification-store.multi-value.move-up'
const REMOVE = 'delete'

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

describe('MultiValueEditor', () => {
  beforeEach(() => { onChange = jest.fn() })

  it('renders exactly one input, the delegate widget, for a key declaring no variants and not repeating', () => {
    renderEditor({ multiValue: false, value: [{ v: 'a' }] })

    expect(inputs()).toHaveLength(1)
    expect(inputs()[0]).toHaveAttribute('data-fieldtype', 'quantityValue')
    expect(screen.queryByText(ADD)).toBeNull()
    expect(screen.queryByLabelText(REMOVE)).toBeNull()
  })

  it('renders one input per declared variant, in declared order, labelled by label or by name', () => {
    renderEditor({
      variants: [{ name: 'metric' }, { name: 'imperial', label: 'Imperial' }],
      multiValue: false,
      value: [{ var: 'imperial', v: '1 ft' }, { var: 'metric', v: '30 cm' }]
    })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric', 'Imperial'])
    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['30 cm', '1 ft'])
  })

  it('does not report opening a key whose variant slots hold nothing yet as a change, and tags the first value written', async () => {
    renderEditor({ variants: [{ name: 'metric' }, { name: 'imperial' }], multiValue: false, value: [{ var: 'metric', v: '30 cm' }] })

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(onChange).not.toHaveBeenCalled()

    fireEvent.change(inputs()[1], { target: { value: '1 ft' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: '30 cm', p: 0 }, { var: 'imperial', v: '1 ft', p: 0 }])
  })

  it('treats null and an empty list of variants alike', () => {
    const rendered = [null, []].map((variants) => {
      const { container, unmount } = renderEditor({ variants, multiValue: false, value: [{ v: 'a' }] })
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
      multiValue: false,
      value: [{ var: 'metric', v: '30 cm' }, { var: 'imperial', v: '1 ft' }]
    })

    fireEvent.change(inputs()[0], { target: { value: '31 cm' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: '31 cm', p: 0 }, { var: 'imperial', v: '1 ft', p: 0 }])
    expect(screen.queryByText(/convert|sync|calculate|derive|suggest/i)).toBeNull()
    expect(screen.queryByLabelText(/convert|sync|calculate|derive|suggest/i)).toBeNull()
  })

  it('writes a repeating list in the order the user left it, and reads it back in that order', async () => {
    const { unmount } = renderEditor({ multiValue: true, value: [{ v: 'one' }, { v: 'two' }, { v: 'three' }] })

    fireEvent.click(screen.getAllByLabelText(MOVE_UP)[2])

    expect((await lastEmitted()).map((entry) => entry.v)).toEqual(['one', 'three', 'two'])
    expect((await lastEmitted()).map((entry) => entry.p)).toEqual([0, 1, 2])

    unmount()
    renderEditor({ multiValue: true, value: [{ v: 'one' }, { v: 'three' }, { v: 'two' }] })

    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['one', 'three', 'two'])
  })

  it('places an entry read with a position at that position, and writes each position as its index in the slot', async () => {
    renderEditor({
      multiValue: true,
      value: [{ v: 'late', p: 2 }, { v: 'early', p: 0 }, { v: 'middle', p: 1 }]
    })

    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['early', 'middle', 'late'])

    fireEvent.click(screen.getAllByLabelText(REMOVE)[1])

    expect(await lastEmitted()).toEqual([{ v: 'early', p: 0 }, { v: 'late', p: 1 }])
  })

  it('renders one list per variant when repeating, and adding to one leaves the other alone', async () => {
    renderEditor({
      variants: [{ name: 'metric' }, { name: 'imperial' }],
      multiValue: true,
      value: [{ var: 'metric', v: 'a' }, { var: 'imperial', v: 'b' }]
    })

    expect(screen.getAllByText(ADD)).toHaveLength(2)
    fireEvent.click(screen.getAllByText(ADD)[0])

    await waitFor(() => { expect(inputs()).toHaveLength(3) })
    // the inputs read slot by slot: the two of metric, then the one of imperial
    fireEvent.change(inputs()[1], { target: { value: 'c' } })

    expect(await lastEmitted()).toEqual([
      { var: 'metric', v: 'a', p: 0 },
      { var: 'imperial', v: 'b', p: 0 },
      { var: 'metric', v: 'c', p: 1 }
    ])
  })

  it('keeps a pending empty row when the value comes back without it', async () => {
    const tree = (value: unknown): React.JSX.Element => (
      <ItemProvider item={ { name: 'height' } }>
        <MultiValueEditor
          delegateDatatype='quantityValue'
          multiValue
          onChange={ onChange }
          value={ value }
          variants={ null }
        />
      </ItemProvider>
    )
    const { rerender } = render(tree([{ v: 'a' }]))

    fireEvent.click(screen.getByText(ADD))
    fireEvent.click(screen.getByText(ADD))
    await waitFor(() => { expect(inputs()).toHaveLength(3) })
    fireEvent.change(inputs()[1], { target: { value: 'b' } })

    const written = await lastEmitted()

    expect(written).toEqual([{ v: 'a', p: 0 }, { v: 'b', p: 1 }])

    rerender(tree(written))

    expect(inputs()).toHaveLength(3)
  })

  it('disables add with a visible reason at the maximum, and shows every stored value past it', () => {
    renderEditor({ multiValue: true, maximum: 2, value: [{ v: 'a' }, { v: 'b' }] })

    expect(screen.getByText(ADD)).toBeDisabled()
    expect(screen.getByText(/maximum-reached/)).toBeVisible()
  })

  it('keeps and shows every stored value under a maximum of 0 or below the stored count, refusing only adds', () => {
    renderEditor({ multiValue: true, maximum: 0, value: [{ v: 'a' }, { v: 'b' }, { v: 'c' }] })

    expect(inputs()).toHaveLength(3)
    expect(screen.getByText(ADD)).toBeDisabled()
    expect(screen.getByText(/maximum-reached/)).toBeVisible()
  })

  it.each([undefined, []])('renders an empty state with add available when nothing is stored (%p)', (value) => {
    renderEditor({ multiValue: true, maximum: null, value })

    expect(screen.getByText('classification-store.multi-value.empty')).toBeVisible()
    expect(screen.getByText(ADD)).toBeEnabled()
  })

  it('refuses add in the empty state under a maximum of 0', () => {
    renderEditor({ multiValue: true, maximum: 0, value: [] })

    expect(screen.getByText(ADD)).toBeDisabled()
    expect(screen.getByText(/maximum-reached/)).toBeVisible()
  })

  it('shows an undeclared variant as not declared and the variant-less entry in a default slot, dropping neither', async () => {
    renderEditor({
      variants: [{ name: 'metric' }],
      multiValue: false,
      value: [{ var: 'metric', v: 'm' }, { var: 'legacy', v: 'l' }, { v: 'd' }]
    })

    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent)

    expect(headings).toEqual(['metric', 'classification-store.multi-value.default-variant', 'legacy'])
    expect(headings[1]).not.toBe('metric')
    expect(screen.getByText('classification-store.multi-value.not-declared')).toBeInTheDocument()
    expect(inputs()).toHaveLength(3)

    fireEvent.change(inputs()[0], { target: { value: 'm2' } })

    expect(await lastEmitted()).toEqual([{ var: 'metric', v: 'm2', p: 0 }, { var: 'legacy', v: 'l', p: 0 }, { v: 'd', p: 0 }])
  })

  // A declared row with no name addresses nothing, so it is no slot of its own; what it must never
  // become is a second unheaded slot beside the default one, or one headed by nothing.
  it('declares no slot for a variant row carrying no name', () => {
    renderEditor({ variants: [{ name: 'metric' }, {} as any], multiValue: false, value: [{ var: 'metric', v: 'm' }] })

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual(['metric'])
    expect(inputs()).toHaveLength(1)
  })

  it('renders the one unheaded slot of a key whose every variant row carries no name', () => {
    renderEditor({ variants: [{} as any], multiValue: false, value: [{ v: 'd' }] })

    expect(screen.queryAllByRole('heading')).toHaveLength(0)
    expect(inputs()).toHaveLength(1)
  })

  // Stored data outranks the declaration, so one slot of a key that does not repeat can hold two
  // values. Each is its own row: keyed by the slot alone they were one child twice over.
  it('keys apart two stored values of one slot of a key that does not repeat', () => {
    const duplicateKeys = jest.spyOn(console, 'error').mockImplementation(() => {})

    renderEditor({
      variants: [{ name: 'metric' }],
      multiValue: false,
      value: [{ var: 'metric', v: 'a' }, { var: 'metric', v: 'b' }]
    })

    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['a', 'b'])
    expect(duplicateKeys.mock.calls.map((call) => String(call[0])).join('')).not.toMatch(/same key/)
    duplicateKeys.mockRestore()
  })

  it('reads an entry carrying no position as position 0, as the server does', () => {
    renderEditor({ multiValue: true, value: [{ v: 'x', p: 1 }, { v: 'y' }] })

    expect(inputs().map((input) => (input as HTMLInputElement).value)).toEqual(['y', 'x'])
  })

  it.each(['a', { v: 'a' }, 3])('states that a stored value %p is not a list, rendering no input and writing nothing', (value) => {
    renderEditor({ multiValue: true, value })

    expect(screen.getByText('classification-store.multi-value.unreadable-value')).toBeInTheDocument()
    expect(inputs()).toHaveLength(0)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('treats a nil stored value as no value, not as an unreadable one', () => {
    renderEditor({ multiValue: true, value: null })

    expect(screen.getByText('classification-store.multi-value.empty')).toBeInTheDocument()
  })

  it('reads no position off a list element holding nothing, and keeps the entries around it', () => {
    renderEditor({ multiValue: true, value: [{ v: 'a' }, null as any, { v: 'b' }] })

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
