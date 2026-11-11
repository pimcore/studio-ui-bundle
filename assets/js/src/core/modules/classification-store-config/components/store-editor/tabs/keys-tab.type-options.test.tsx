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
 * What the type select of the keys tab offers and what it disables, read off the columns the
 * tab hands the grid. The grid is replaced by a stand-in that captures them, so this cannot
 * share a file with the cell-edit, creation and delete tests in `keys-tab.test.tsx`, which
 * render the real grid: a `jest.mock` of the grid applies to the whole module registry of its
 * file.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { KeysTab } from './keys-tab'

interface CapturedOption {
  value: string
  disabled?: boolean
  displayValue?: string
}

let capturedColumns: any[] = []
let storeEngine: { engine: string | null | undefined, engineCapabilities: string[] | null | undefined }

const STORE_ID = 7
// email is an Input-derived type: it normalizes to `mixed`, so the EAV value columns hold it.
const TYPE_IDS = ['input', 'email', 'geopoint', 'manyToOneRelation', 'multiValue']
const DOCUMENT_CAPABILITIES = ['StructuredValues', 'Relations']

// a declaration, so it is initialised when the hoisted mock factories run
function stub (): null {
  return null
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('antd', () => ({ theme: { useToken: () => ({ token: { paddingXS: 0, padding: 0 } }) } }))

jest.mock('@Pimcore/app/config/app-config', () => ({ appConfig: { defaultPageSize: 20 } }))

jest.mock('@sdk/app', () => ({
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'registry' },
  useInjection: () => ({
    getTypesByTags: () => TYPE_IDS.map((id) => ({ id }))
  })
}))

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({ useStudioModal: () => ({ localModal: { confirm: jest.fn() } }) }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: Object.assign(stub, { useForm: () => [{}] }) }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: stub }))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({ IconTextButton: stub }))
jest.mock('@Pimcore/components/input/input', () => ({ Input: stub }))
jest.mock('@Pimcore/components/search-input/search-input', () => ({ SearchInput: stub }))
jest.mock('@Pimcore/components/segmented/segmented', () => ({ Segmented: stub }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: stub }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({ ContentLayout: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/header/header', () => ({ Header: stub }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: stub }))
jest.mock('@Pimcore/components/pagination/pagination', () => ({ Pagination: stub }))
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns }: any) => {
    capturedColumns = columns
    return null
  }
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))
jest.mock('./keys/key-definition-modal', () => ({ KeyDefinitionModal: stub }))
jest.mock('./shared/metadata-modal', () => ({ MetadataModal: stub }))
jest.mock('./shared/titles-modal', () => ({ TitlesModal: stub }))
jest.mock('./shared/pair-actions', () => ({ PairActions: stub }))
jest.mock('@Pimcore/modules/classification-store-config/hooks/use-store-engine', () => ({
  useStoreEngine: () => storeEngine
}))
jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useClassificationStoreConfigurationKeyCollectionQuery: () => ({ data: { items: [], totalItems: 0 }, isLoading: false, isFetching: false, refetch: jest.fn() }),
  useClassificationStoreConfigurationKeyCreateMutation: () => [jest.fn()],
  useClassificationStoreConfigurationKeyDeleteMutation: () => [jest.fn()],
  useClassificationStoreConfigurationKeyRestoreMutation: () => [jest.fn()],
  useClassificationStoreConfigurationKeyUpdateMutation: () => [jest.fn()]
}))

const typeOptions = (): CapturedOption[] => {
  const typeColumn = capturedColumns.find((column) => column.accessorKey === 'type')

  return typeColumn.meta.config.options
}

const disabledTypes = (): string[] => typeOptions().filter((option) => option.disabled === true).map((option) => option.value)

describe('KeysTab type select', () => {
  it('disables nothing on a store whose capability set holds the structured types', () => {
    storeEngine = { engine: 'document', engineCapabilities: DOCUMENT_CAPABILITIES }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(typeOptions().map((option) => option.value).sort()).toEqual([...TYPE_IDS].sort())
    expect(disabledTypes()).toEqual([])
  })

  it('offers multiValue as a key type, held by every engine', () => {
    storeEngine = { engine: 'eav', engineCapabilities: [] }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(typeOptions().find((option) => option.value === 'multiValue')).toEqual({ label: 'field-definition.multi-value', value: 'multiValue' })
  })

  it('lists the structured types but disables them on an EAV store', () => {
    storeEngine = { engine: 'eav', engineCapabilities: [] }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(typeOptions().map((option) => option.value).sort()).toEqual([...TYPE_IDS].sort())
    expect(disabledTypes().sort()).toEqual(['geopoint', 'manyToOneRelation'])
  })

  // The definition gate core applies is StructuredValues alone, so an engine reporting only that
  // disables nothing - including the relation types, whose Relations check is a write-time one.
  it('disables nothing on an engine that reports StructuredValues without Relations', () => {
    storeEngine = { engine: 'document', engineCapabilities: ['StructuredValues'] }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(disabledTypes()).toEqual([])
  })

  it('disables nothing when the response carries no capability set', () => {
    storeEngine = { engine: undefined, engineCapabilities: undefined }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(disabledTypes()).toEqual([])
  })

  it('treats a null capability set as no answer rather than as an empty one', () => {
    storeEngine = { engine: null, engineCapabilities: null }
    render(<KeysTab storeId={ STORE_ID } />)

    expect(disabledTypes()).toEqual([])
  })
})
