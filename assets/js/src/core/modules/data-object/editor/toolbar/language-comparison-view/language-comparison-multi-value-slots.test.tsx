/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The slots a `multiValue` key is offered under in the language comparison: the published key layout
 * through the real extraction, its descriptor handed to the real editor the way the rendered item does.
 */

// the form barrel reaches antd-style's untranspiled ESM; the editor needs the list and its group only
jest.mock('@Pimcore/components/form/form', () => ({
  // getters, because the list itself imports this barrel while it is being loaded
  Form: {
    get Group () { return jest.requireActual('@Pimcore/components/form/group/group').Group },
    get NumberedList () { return jest.requireActual('@Pimcore/components/form/controls/numbered-list/numbered-list').NumberedList }
  }
}))

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tag/tag', () => ({ Tag: ({ children }: any) => <em>{children}</em> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <p>{children}</p> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: any) => <h5>{children}</h5> }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => <button type='button' /> }))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: jest.fn() },
  useInjection: () => ({
    hasDynamicType: () => true,
    getDynamicType: () => ({ canReadValue: () => true })
  })
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry' }
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label', () => ({ FieldLabel: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider', () => ({ defaultFieldWidthValues: {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/grid-cells/image/default-preview', () => ({ DefaultPreview: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store', () => ({ ClassificationStore: () => null }))
jest.mock('@sdk/utils', () => ({ isNonEmptyString: () => false }))
jest.mock('@Pimcore/utils/helpers', () => ({ respectLineBreak: (value: string) => value }))
jest.mock('@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions', () => ({
  getBreadcrumbTitle: (first: string, second: string) => [first, second].filter(Boolean).join('/')
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component', () => {
  const { useEffect } = jest.requireActual('react')
  const { useFormGroupOptional } = jest.requireActual('@Pimcore/components/form/group/provider/use-form-group-optional')
  const { useNumberedList } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list')

  // binds to the `v` member of the entry its group names, registering null as the form item does
  const DataComponent = (props: any): React.JSX.Element => {
    const path = [...(useFormGroupOptional().name as string[]), props.name]
    const { operations } = useNumberedList()
    const current = operations.getValue(path)

    useEffect(() => {
      if (current === undefined) {
        operations.update(path, null, true)
      }
    }, [current])

    return (
      <input
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
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
// eslint-disable-next-line import/first
import { MultiValueEditor } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-editor'
// eslint-disable-next-line import/first
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
// eslint-disable-next-line import/first
import { type ILocalizedFieldDescriptor } from './helpers/process-layout-data'

const FIELD_NAME = 'technicalAttributes'
const GROUP_ID = 3
const KEY_ID = 4873
const DELEGATE = 'input'
const DEFAULT_HEADING = 'classification-store.multi-value.default-variant'
const NOT_DECLARED = 'classification-store.multi-value.not-declared'

const classificationStoreType = new DynamicTypeObjectDataClassificationStore()

const objectDataRegistry = {
  hasDynamicType: () => true,
  getDynamicType: () => classificationStoreType
} as unknown as DynamicTypeObjectDataRegistry

interface IVariantRow { name: string, label?: string }

/**
 * The stored `definition` blob of a `multiValue` key, which names the default variant
 * `unqualifiedValue` - the spelling of core's `Data\MultiValue`, not of the key layout.
 */
const definitionBlob = (blob: {
  variants?: IVariantRow[]
  unqualifiedValue?: boolean
  unqualifiedValueLabel?: string | null
}): Record<string, any> => ({
  name: 'testVariants',
  datatype: 'data',
  fieldtype: 'multiValue',
  delegateDatatype: DELEGATE,
  delegate: null,
  ...blob
})

/**
 * One key of a group as the object endpoint publishes it: the blob, and beside it the three members
 * the key layout publishes under their own names (ActiveGroupTitleEnricher::fillKey). Each half is
 * stated on its own, so a case can name one and leave the other out.
 */
const keyLayout = (
  definition: Record<string, any>,
  layoutMembers: Record<string, any> = {}
): Record<string, any> => ({
  id: KEY_ID,
  name: 'testVariants',
  title: 'Test Variants',
  localized: true,
  definition,
  ...layoutMembers
})

/** The layout members of a key whose declaration the layout endpoint resolved and published. */
const published = ({
  variants = [],
  defaultVariant,
  defaultVariantLabel = null
}: {
  variants?: IVariantRow[]
  defaultVariant: boolean
  defaultVariantLabel?: string | null
}): Record<string, any> => ({ variants, defaultVariant, defaultVariantLabel })

const layoutItem = (key: Record<string, any>): Record<string, any> => ({
  name: FIELD_NAME,
  title: 'Technical Attributes',
  datatype: 'data',
  fieldtype: 'classificationstore',
  localized: true,
  activeGroupDefinitions: [{ id: GROUP_ID, name: 'Rims', keys: [key] }]
})

const extractDescriptor = async (key: Record<string, any>): Promise<ILocalizedFieldDescriptor> => {
  const descriptors = await classificationStoreType.extractLocalizedFields({
    objectId: 377,
    item: layoutItem(key),
    objectData: {},
    fieldBreadcrumbTitle: '',
    formPath: [],
    objectDataRegistry,
    layoutsList: [],
    setLayoutsList: () => {}
  })

  if (descriptors === false || descriptors.length !== 1) {
    throw new Error('the classification store contributed no comparison column for the key')
  }

  return descriptors[0]
}

/** What the rendered comparison item mounts for one descriptor: the dynamic type's component, fed the descriptor's field data. */
const renderComparisonSlot = (descriptor: ILocalizedFieldDescriptor, value: unknown): void => {
  render(
    <ItemProvider item={ { name: String(KEY_ID) } }>
      <MultiValueEditor
        { ...(descriptor.fieldData as any) }
        value={ value }
      />
    </ItemProvider>
  )
}

const headings = (): string[] => screen.queryAllByRole('heading').map((heading) => heading.textContent)

const inputs = (): HTMLElement[] => screen.queryAllByRole('textbox')

const TWO_VARIANTS: IVariantRow[] = [{ name: 'Metric' }, { name: 'Imperial' }]

describe('the language comparison offers a multiValue key the slots the key declares', () => {
  // key 4873 of the demo: two named variants, and `unqualifiedValue: false` in the stored blob
  it('offers only the declared variants for a key that declines the unqualified value', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: TWO_VARIANTS, unqualifiedValue: false }),
      published({ variants: TWO_VARIANTS, defaultVariant: false })
    ))

    renderComparisonSlot(descriptor, [{ var: 'Metric', v: '22' }])

    expect(headings()).toEqual(['Metric', 'Imperial'])
    expect(screen.queryByText(DEFAULT_HEADING)).toBeNull()
    expect(inputs()).toHaveLength(2)
  })

  // the flag can arrive on either half, so each is asserted to be read on its own
  it('reads the flag off the blob where the key layout publishes no members', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: TWO_VARIANTS, unqualifiedValue: false })
    ))

    renderComparisonSlot(descriptor, [{ var: 'Metric', v: '22' }])

    expect(headings()).toEqual(['Metric', 'Imperial'])
    expect(inputs()).toHaveLength(2)
  })

  it('reads the flag off the key layout where the blob carries none', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: TWO_VARIANTS }),
      published({ variants: TWO_VARIANTS, defaultVariant: false })
    ))

    renderComparisonSlot(descriptor, [{ var: 'Metric', v: '22' }])

    expect(headings()).toEqual(['Metric', 'Imperial'])
    expect(inputs()).toHaveLength(2)
  })

  it('still offers the unqualified value beside them where the key permits it', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: [{ name: 'Metric' }, { name: 'Imperial', label: 'Imperial' }], unqualifiedValue: true }),
      published({ variants: [{ name: 'Metric' }, { name: 'Imperial', label: 'Imperial' }], defaultVariant: true })
    ))

    renderComparisonSlot(descriptor, [{ var: 'Metric', v: '22' }])

    expect(headings()).toEqual(['Metric', 'Imperial', DEFAULT_HEADING])
    expect(inputs()).toHaveLength(3)
  })

  // a key carrying neither member permits it, the way a blob written before the member existed does
  it('offers it for a key that states nothing about it', async () => {
    const descriptor = await extractDescriptor(keyLayout(definitionBlob({ variants: TWO_VARIANTS })))

    renderComparisonSlot(descriptor, [])

    expect(headings()).toEqual(['Metric', 'Imperial', DEFAULT_HEADING])
  })

  it('heads the slot with the label the key declares for it', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: [{ name: 'Metric' }], unqualifiedValue: true, unqualifiedValueLabel: 'Unqualified' }),
      published({ variants: [{ name: 'Metric' }], defaultVariant: true, defaultVariantLabel: 'Unqualified' })
    ))

    renderComparisonSlot(descriptor, [])

    expect(headings()).toEqual(['Metric', 'Unqualified'])
  })

  it('offers the one unheaded slot of a key that declares no variants at all', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ unqualifiedValue: true }),
      published({ defaultVariant: true })
    ))

    renderComparisonSlot(descriptor, [{ v: '22' }])

    expect(headings()).toEqual([])
    expect(inputs()).toHaveLength(1)
  })

  it('keeps the slot of a stored value the key no longer declares, tagged as undeclared', async () => {
    const descriptor = await extractDescriptor(keyLayout(
      definitionBlob({ variants: [{ name: 'Metric' }], unqualifiedValue: false }),
      published({ variants: [{ name: 'Metric' }], defaultVariant: false })
    ))

    renderComparisonSlot(descriptor, [{ var: 'Metric', v: '22' }, { v: 'written before' }])

    expect(headings()).toEqual(['Metric', DEFAULT_HEADING])
    expect(screen.getByText(NOT_DECLARED)).not.toBeNull()
  })
})
