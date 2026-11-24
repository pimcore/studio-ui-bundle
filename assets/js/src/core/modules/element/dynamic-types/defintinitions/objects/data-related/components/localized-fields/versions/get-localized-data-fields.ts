/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DATATYPE_LIST } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'

export interface ILocalizedDataField<T> {
  field: T
  breadcrumbTitle: string
}

interface ILocalizedFieldsChild {
  datatype?: string
  title?: unknown
  children?: unknown
}

/**
 * The children of a localizedfields definition can wrap its data fields in layout
 * elements (panels, tabpanels, fieldsets, ...). Returns the data fields at any depth,
 * each with the titles of the layouts around it appended to the breadcrumb.
 */
export const getLocalizedDataFields = <T extends ILocalizedFieldsChild>(children: T[] | undefined, breadcrumbTitle: string = ''): Array<ILocalizedDataField<T>> => {
  return (children ?? []).flatMap((child): Array<ILocalizedDataField<T>> => {
    if (child?.datatype === DATATYPE_LIST.LAYOUT) {
      const layoutTitle = typeof child.title === 'string' ? child.title : ''

      return getLocalizedDataFields(child.children as T[] | undefined, [breadcrumbTitle, layoutTitle].filter(Boolean).join('/'))
    }

    return [{ field: child, breadcrumbTitle }]
  })
}
