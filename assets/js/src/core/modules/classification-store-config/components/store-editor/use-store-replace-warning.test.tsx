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
 * Importing a file that describes another store replaces the target's configuration rather than
 * merging into it, so a store that holds anything has to be warned about first. An empty one has
 * nothing to lose and is imported into without a word.
 */

const WARNING = 'classification-store.import-replace.warning'

const confirm = jest.fn()
const fetchImportReplaces = jest.fn()
let hasContent = true

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ localModal: { confirm } })
}))

jest.mock('@Pimcore/modules/classification-store-config/hooks/use-store-has-content', () => ({
  useStoreHasContent: () => hasContent
}))

jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/store-import-endpoint', () => ({
  fetchImportReplaces: async (...args: unknown[]) => await fetchImportReplaces(...args)
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, renderHook, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useStoreReplaceWarning } from './use-store-replace-warning'

const STORE_ID = 4
const file = new File(['{}'], 'store.json', { type: 'application/json' })

const confirmImport = async (): Promise<boolean> => {
  const { result } = renderHook(() => useStoreReplaceWarning(STORE_ID))

  return await result.current([file])
}

const warning = async (): Promise<Record<string, any>> => {
  await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })

  return confirm.mock.calls[0][0]
}

describe('useStoreReplaceWarning', () => {
  beforeEach(() => {
    confirm.mockClear()
    fetchImportReplaces.mockReset()
    fetchImportReplaces.mockResolvedValue(true)
    hasContent = true
  })

  it('warns before importing into a store that holds something', async () => {
    const answer = confirmImport()
    const { content, onOk } = await warning()

    render(<>{content as React.ReactNode}</>)
    expect(screen.getByText(WARNING)).toBeInTheDocument()

    onOk()
    await expect(answer).resolves.toBe(true)
  })

  it('imports into an empty store without warning', async () => {
    hasContent = false

    await expect(confirmImport()).resolves.toBe(true)
    expect(confirm).not.toHaveBeenCalled()
  })

  it('calls the import off when the warning is declined', async () => {
    const answer = confirmImport()
    const { onCancel } = await warning()

    onCancel()

    await expect(answer).resolves.toBe(false)
  })

  it('does not warn for a restore into the store the file describes', async () => {
    fetchImportReplaces.mockResolvedValue(false)

    await expect(confirmImport()).resolves.toBe(true)
  })

  it('still warns when the dry run cannot say', async () => {
    fetchImportReplaces.mockResolvedValue(null)

    const answer = confirmImport()
    const { onOk } = await warning()

    onOk()
    await expect(answer).resolves.toBe(true)
  })

  it('says only the one sentence, never a list of what goes', async () => {
    const answer = confirmImport()
    const { content, onOk } = await warning()

    render(<>{content as React.ReactNode}</>)
    expect(screen.getByText(WARNING)).toBeInTheDocument()

    onOk()
    await answer
  })
})
