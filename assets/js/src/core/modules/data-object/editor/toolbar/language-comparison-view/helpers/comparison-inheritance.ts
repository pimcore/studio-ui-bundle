/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isPlainObject } from 'lodash'
import { type InheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider'

/**
 * The full paths of the values a form change carries. A type that keeps its values in buckets,
 * the Classification Store above all, reports the bucket it wrote into, while the payload is
 * filtered by the inheritance of the key inside it.
 *
 * Only a plain object is a bucket: a list is a value of its own, the entries of a multiValue
 * key, and is reported as the path it sits at.
 */
export const collectChangedFieldPaths = (changedValues: Record<string, any>, parentPath: string[] = []): string[] =>
  Object.entries(changedValues).flatMap(([name, value]) => {
    const path = [...parentPath, name]

    return isPlainObject(value) && !isEmpty(value)
      ? collectChangedFieldPaths(value as Record<string, any>, path)
      : [path.join('.')]
  })

interface ICreateIsInheritedProps {
  /** Paths collected by collectChangedFieldPaths while the dialog is open, kept in writing order. */
  changedFieldPaths: ReadonlySet<string>
  getInheritanceState: (name: string[]) => InheritanceState | undefined
}

/**
 * Whether the field named by its full form path still holds an inherited value.
 *
 * A field the comparison typed into carries an own value, whatever the editor's state says: the
 * dialog renders plain form items, so nothing in it breaks inheritance the way the editor's own
 * control does. Without that, an edit of an inherited key would be filtered out of the payload
 * again as inherited, and the key could not be overridden through the dialog at all.
 */
export const createIsInherited = ({ changedFieldPaths, getInheritanceState }: ICreateIsInheritedProps): ((fieldName: string) => boolean) =>
  (fieldName: string): boolean =>
    !changedFieldPaths.has(fieldName) && getInheritanceState(fieldName.split('.'))?.inherited === true
