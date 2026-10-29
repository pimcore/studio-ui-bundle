/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildGridChunks } from './grid-chunks'

const relatedObjects = (count: number, subtype: string, firstId: number = 1): any[] =>
  Array.from({ length: count }, (_, index) => ({
    id: firstId + index,
    type: 'object',
    subtype,
    fullPath: `/objects/${firstId + index}`,
    isPublished: true
  }))

const range = (from: number, to: number): number[] => Array.from({ length: to - from + 1 }, (_, index) => from + index)

describe('buildGridChunks', () => {
  it('splits the related objects of a class into chunks in relation order', () => {
    const chunks = buildGridChunks(relatedObjects(250, 'Car'), ['Car'], 100)

    expect(chunks.map(chunk => chunk.ids.length)).toEqual([100, 100, 50])
    expect(chunks.map(chunk => chunk.classId)).toEqual(['Car', 'Car', 'Car'])
    expect(chunks.flatMap(chunk => chunk.ids)).toEqual(range(1, 250))
  })

  // The rows on top of the relation are on screen first, whatever class they belong to.
  it('orders the chunks of several classes by the relation position of their first row', () => {
    const value = [
      ...relatedObjects(50, 'Car', 1),
      ...relatedObjects(50, 'News', 51),
      ...relatedObjects(200, 'Car', 101)
    ]

    expect(buildGridChunks(value, ['Car', 'News'], 100)).toEqual([
      { classId: 'Car', ids: [...range(1, 50), ...range(101, 150)] },
      { classId: 'News', ids: range(51, 100) },
      { classId: 'Car', ids: range(151, 250) },
      { classId: 'Car', ids: range(251, 300) }
    ])
  })

  it('returns no chunks for an empty relation', () => {
    expect(buildGridChunks([], ['Car'], 100)).toEqual([])
    expect(buildGridChunks(null, ['Car'], 100)).toEqual([])
    expect(buildGridChunks(undefined, ['Car'], 100)).toEqual([])
  })

  it('leaves out related objects of classes without visible fields', () => {
    const chunks = buildGridChunks([...relatedObjects(2, 'Car'), ...relatedObjects(2, 'Bike', 10)], ['Car'], 100)

    expect(chunks).toEqual([{ classId: 'Car', ids: [1, 2] }])
  })
})
