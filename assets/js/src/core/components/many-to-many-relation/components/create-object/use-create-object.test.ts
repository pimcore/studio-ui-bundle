/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const addDataObject = jest.fn()
const trackError = jest.fn()

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectAddMutation: () => [addDataObject, { isLoading: false }]
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (...args: unknown[]) => trackError(...args),
  ApiError: class ApiError extends Error {},
  GeneralError: class GeneralError extends Error {}
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useCreateObject } from './use-create-object'
// eslint-disable-next-line import/first
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'

const carClass = { id: 'CAR-ID', name: 'Car' } as unknown as ClassDefinitionListItem

const values = {
  classId: 'CAR-ID',
  key: 'My Car',
  parent: { id: 7, fullPath: '/Products/Cars' }
}

interface Setup {
  result: { current: ReturnType<typeof useCreateObject> }
  onCreated: jest.Mock
  onSuccess: jest.Mock
}

const setup = (classes: ClassDefinitionListItem[] = [carClass]): Setup => {
  const onCreated = jest.fn()
  const onSuccess = jest.fn()
  const { result } = renderHook(() => useCreateObject({ classes, onCreated, onSuccess }))

  return { result, onCreated, onSuccess }
}

describe('useCreateObject', () => {
  beforeEach(() => {
    addDataObject.mockReset()
    trackError.mockReset()
  })

  it('sends the parent and the selected class to the add endpoint', async () => {
    addDataObject.mockResolvedValue({ data: { id: 99 } })
    const { result } = setup()

    await result.current.createObject(values)

    expect(addDataObject).toHaveBeenCalledWith({
      parentId: 7,
      dataObjectAddParameters: { key: 'My Car', classId: 'CAR-ID', type: 'object' }
    })
  })

  it('hands the created row to the relation and closes on success', async () => {
    addDataObject.mockResolvedValue({ data: { id: 99 } })
    const { result, onCreated, onSuccess } = setup()

    await result.current.createObject(values)

    expect(onCreated).toHaveBeenCalledWith({
      id: 99,
      type: 'object',
      subtype: 'Car',
      fullPath: '/Products/Cars/My Car',
      isPublished: false
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('reports an API error and keeps the modal open', async () => {
    addDataObject.mockResolvedValue({ error: { status: 500 } })
    const { result, onCreated, onSuccess } = setup()

    await result.current.createObject(values)

    expect(trackError).toHaveBeenCalled()
    expect(onCreated).not.toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('reports a thrown error instead of swallowing it', async () => {
    addDataObject.mockRejectedValue(new Error('network down'))
    const { result, onSuccess } = setup()

    await result.current.createObject(values)

    expect(trackError).toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('refuses to create when the submitted class is not among the creatable ones', async () => {
    const { result, onCreated } = setup([])

    await result.current.createObject(values)

    expect(addDataObject).not.toHaveBeenCalled()
    expect(onCreated).not.toHaveBeenCalled()
    expect(trackError).toHaveBeenCalled()
  })
})
