/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { get, isEmpty, isNil } from 'lodash'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import {
  DATATYPE_LIST,
  type IFormattedDataStructureData,
  type ILayoutItem
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface LayoutNode {
  datatype?: string
  fieldtype?: string
  name?: string
  title?: string | null
  children?: LayoutNode[]
  fieldBreadcrumbTitle?: string
  locale?: string
  [key: string]: unknown
}

export interface LocalizedFieldSection {
  /** Hierarchical path of layout panel titles joined with '/', e.g. 'General Information/Content' */
  breadcrumbTitle: string
  /**
   * The localizedfields container nodes to render.
   * Each node has `.children` holding the individual localized field definitions.
   */
  nodes: LayoutNode[]
  /**
   * Ant Design Form.Group path segments above the `localizedfields` group.
   * Empty for top-level localized fields.
   * For localized fields inside objectbricks: e.g. ['objectbricks', 'BrickType'].
   */
  formPath: string[]
}

export interface IProcessLayoutDataProps {
  objectId: number
  layout: Layout
  objectDataRegistry: DynamicTypeObjectDataRegistry
  layoutsList?: ILayoutItem[]
  setLayoutsList?: (layouts: ILayoutItem[]) => void
}

const fieldTypesRequiringChildren = [DynamicTypesList.BLOCK]

/**
 * Mirrors the `processLayoutData` logic from the Versions tab
 * (`details-functions.ts / getFormattedDataStructure`) with one key difference:
 * when a `fieldtype === 'localizedfields'` node is encountered it is collected
 * directly (keeping the container node with its `.children` intact) instead of
 * being dispatched to `processVersionFieldData` (which would explode it into
 * per-field-per-locale leaves).
 *
 * All other complex types (objectbricks, classificationstore, etc.) still go
 * through `processVersionFieldData` + children recursion exactly as in the
 * Versions tab, so localizedfields nested inside those complex types are also
 * surfaced.
 *
 * The collected `localizedfields` nodes are grouped into `LocalizedFieldSection[]`
 * so `LanguageComparisonColumn` can render them via `ObjectComponent` +
 * `LocalizedFieldsProvider`.
 */
export const processLayoutData = async ({
  objectId,
  layout,
  objectDataRegistry,
  layoutsList = [],
  setLayoutsList = () => {}
}: IProcessLayoutDataProps): Promise<LocalizedFieldSection[]> => {
  if (isNil(layout?.children) || isEmpty(layout.children)) {
    return []
  }

  interface LocalizedFieldEntry {
    breadcrumbTitle: string
    fieldPath: string
    node: LayoutNode
  }

  const collectedLocalizedFields: LocalizedFieldEntry[] = []

  const processVersionsLayoutData = async ({
    data,
    objectValuesData = {},
    fieldBreadcrumbTitle = '',
    fieldPath = ''
  }: {
    data: Layout['children']
    objectValuesData?: Record<string, unknown>
    fieldBreadcrumbTitle?: string
    fieldPath?: string
  }): Promise<void> => {
    const promises = data.map(async (item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)

        return await processVersionsLayoutData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData, fieldPath })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValueByName = get(objectValuesData, fieldName) as any
        const currentFieldType: string = item.fieldtype

        const getFieldPathValue = isEmptyValue(fieldPath) ? fieldName : `${fieldPath}.${fieldName}`

        if (currentFieldType === DynamicTypesList.LOCALIZED_FIELDS) {
          collectedLocalizedFields.push({
            breadcrumbTitle: fieldBreadcrumbTitle,
            fieldPath: getFieldPathValue,
            node: item as LayoutNode
          })
          return
        }

        // BLOCK: the base processVersionFieldData returns the block node as a
        // single opaque entry and the versions logic intentionally skips
        // recursing into its children. For the SplitView we must scan the
        // block's children directly to surface any localizedfields inside it.
        if (currentFieldType === DynamicTypesList.BLOCK) {
          const blockChildren: LayoutNode[] = Array.isArray(item.children) ? item.children : []
          const blockBreadcrumb = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title ?? '')

          await processVersionsLayoutData({
            data: blockChildren as Layout['children'],
            fieldBreadcrumbTitle: blockBreadcrumb,
            fieldPath: getFieldPathValue
          })
          return
        }

        if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
          return
        }

        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        const processedDataList = await objectDataType.processVersionFieldData({
          objectId,
          item,
          fieldBreadcrumbTitle,
          fieldValueByName,
          versionId: 0,
          versionCount: 0,
          layoutsList,
          setLayoutsList,
          fieldPath: getFieldPathValue
        })

        const processedPromises = processedDataList?.map(async (processedDataItem: IFormattedDataStructureData): Promise<void> => {
          objectValuesData = {}

          // If a complex type (e.g. objectbricks) returned a localizedfields node
          // as a flat leaf, intercept it here directly — its children recursion
          // path cannot be relied on because processVersionFieldData of the
          // containing type already flattened it without recursing into children.
          if (processedDataItem?.fieldData?.fieldtype === DynamicTypesList.LOCALIZED_FIELDS) {
            collectedLocalizedFields.push({
              breadcrumbTitle: processedDataItem.fieldBreadcrumbTitle,
              fieldPath: processedDataItem.fieldPath ?? '',
              node: processedDataItem.fieldData as unknown as LayoutNode
            })
            return
          }

          if (!isEmpty(processedDataItem?.fieldData?.children) && !fieldTypesRequiringChildren.includes(processedDataItem?.fieldData?.fieldtype as DynamicTypesList)) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, processedDataItem?.fieldData?.title ?? '')

            return await processVersionsLayoutData({
              data: [processedDataItem?.fieldData],
              objectValuesData: {
                ...objectValuesData,
                [processedDataItem?.fieldData?.name]: processedDataItem?.fieldValue
              },
              fieldBreadcrumbTitle: breadcrumbTitle,
              fieldPath: processedDataItem?.fieldPath ?? ''
            })
          }
        })

        await Promise.all(processedPromises)
      }
    })

    await Promise.all(promises)
  }

  await processVersionsLayoutData({ data: layout.children })

  return groupIntoSections(collectedLocalizedFields)
}

/**
 * Groups collected localizedfields entries by (fieldPath prefix + breadcrumbTitle).
 *
 * fieldPath for a top-level localizedfields node is simply 'localizedfields'.
 * For one nested inside objectbricks it is e.g. 'objectbricks.BrickA.localizedfields'.
 * The segments before 'localizedfields' become `formPath` — the Ant Design
 * Form.Group nesting that LanguageComparisonColumn must wrap around the fields.
 */
const groupIntoSections = (entries: Array<{ breadcrumbTitle: string, fieldPath: string, node: LayoutNode }>): LocalizedFieldSection[] => {
  const sectionMap = new Map<string, LocalizedFieldSection>()

  for (const { breadcrumbTitle, fieldPath, node } of entries) {
    const formPath = deriveFormPath(fieldPath)
    const key = `${formPath.join('|')}::${breadcrumbTitle}`

    if (!sectionMap.has(key)) {
      sectionMap.set(key, { breadcrumbTitle, formPath, nodes: [] })
    }

    sectionMap.get(key)!.nodes.push(node)
  }

  return Array.from(sectionMap.values())
}

/**
 * Extracts the form path (segments before 'localizedfields') from a fieldPath.
 *
 * Examples:
 *   'localizedfields'                        → []
 *   'objectbricks.BrickA.localizedfields'    → ['objectbricks', 'BrickA']
 */
const deriveFormPath = (fieldPath: string): string[] => {
  if (isEmptyValue(fieldPath)) return []

  const segments = fieldPath.split('.')
  const lfIndex = segments.lastIndexOf('localizedfields')

  return lfIndex <= 0 ? [] : segments.slice(0, lfIndex)
}
