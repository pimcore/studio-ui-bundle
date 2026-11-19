/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type NamePath } from 'antd/es/form/interface'

// one registration can overwrite what another wrote when either path contains the
// other: `myBrick` covers `myBrick.length`, and writing one after the other is not
// the same as writing them the other way round.
//
// Segments are compared as strings because a NamePath permits numbers and lodash
// addresses `1` and `'1'` as one property. Comparing them as written would let the
// same path spelled two ways look like two paths, which is exactly the overlap this
// has to catch.
export const pathsOverlap = (a: NamePath[], b: NamePath[]): boolean => {
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a]

  return shorter.every((segment, index) => String(segment) === String(longer[index]))
}
