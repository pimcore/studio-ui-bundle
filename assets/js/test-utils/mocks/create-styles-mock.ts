/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Stands in for create-styles (antd-style's ESM build is not transformed by jest): each style key becomes a readable class.
export const createStyles = () => () => ({
  styles: new Proxy({}, { get: (_target, key) => `style-${String(key)}` }),
  cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '),
  theme: {}
})
