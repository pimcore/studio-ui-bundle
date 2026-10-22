/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { buildMoveTargetOptions, matchesMoveTarget } from './move-target-options'

const rootTag = { id: 0, text: 'All Tags', hasChildren: true, children: [], path: '/All Tags', parentId: 0, iconName: 'folder' } as unknown as Tag

const tag = (id: number, text: string, parentId: number, children: Tag[] = []): Tag =>
  ({ id, text, parentId, children, hasChildren: children.length > 0, path: '' }) as unknown as Tag

const germany = tag(3, 'Germany', 2)
const countries = tag(2, 'Countries', 0, [germany])
const quality = tag(4, 'Quality', 0, [tag(5, 'Try', 4)])
const tags = [countries, quality]

describe('buildMoveTargetOptions', () => {
  it('labels every tag with its full path and offers the root first', () => {
    expect(buildMoveTargetOptions(tags, rootTag)).toEqual([
      { value: 0, label: 'All Tags' },
      { value: 2, label: 'All Tags / Countries' },
      { value: 3, label: 'All Tags / Countries / Germany' },
      { value: 4, label: 'All Tags / Quality' },
      { value: 5, label: 'All Tags / Quality / Try' }
    ])
  })

  it('leaves out the moved tag and everything below it', () => {
    const labels = buildMoveTargetOptions(tags, rootTag, 2).map((option) => option.label)

    expect(labels).toEqual(['All Tags', 'All Tags / Quality', 'All Tags / Quality / Try'])
  })

  it('keeps the other branches when a leaf is moved', () => {
    const values = buildMoveTargetOptions(tags, rootTag, 5).map((option) => option.value)

    expect(values).toEqual([0, 2, 3, 4])
  })
})

describe('matchesMoveTarget', () => {
  const option = { value: 3, label: 'All Tags / Countries / Germany' }

  it('matches any part of the path, ignoring case and surrounding spaces', () => {
    expect(matchesMoveTarget('germ', option)).toBe(true)
    expect(matchesMoveTarget('  COUNTRIES ', option)).toBe(true)
  })

  it('does not match an unrelated term', () => {
    expect(matchesMoveTarget('austria', option)).toBe(false)
  })

  it('handles a missing option', () => {
    expect(matchesMoveTarget('germ', undefined)).toBe(false)
  })
})
