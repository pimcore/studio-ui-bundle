/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
