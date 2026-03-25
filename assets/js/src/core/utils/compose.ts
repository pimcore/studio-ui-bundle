/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-argument */
export type ComposeFn<T = unknown> = (props: T, ...args: any) => T
export type ComposeProps<T = unknown> = ComposeFn<T> | [ComposeFn<T>, ...any]

export const compose = <T = unknown>(...fns: Array<ComposeProps<T>>): (props: T) => T => {
  return (initialArg) => {
    return fns.reduce((arg, fn) => {
      if (Array.isArray(fn)) {
        return fn[0](arg, ...fn.slice(1))
      }
      return fn(arg)
    }, initialArg)
  }
}
