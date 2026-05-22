/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getStringValue = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined
}

interface TraversalContext {
  currentTopLevelDataName?: string
}

interface NodeMeta {
  dataType?: string
  name?: string
  fieldType?: string
}

interface TopLevelDataFieldMeta extends NodeMeta {
  name: string
  fieldType: string
}

const getNodeMeta = (node: Record<string, unknown>): NodeMeta => {
  return {
    dataType: getStringValue(node.datatype ?? node.dataType),
    name: getStringValue(node.name),
    fieldType: getStringValue(node.fieldType ?? node.fieldtype)
  }
}

const isTopLevelDataField = (meta: NodeMeta, context: TraversalContext): meta is TopLevelDataFieldMeta => {
  return meta.dataType === 'data' && context.currentTopLevelDataName === undefined && meta.name !== undefined && meta.fieldType !== undefined
}

const collectFieldTypes = (
  node: unknown,
  fieldTypeMap: Map<string, string>,
  context: TraversalContext = {}
): void => {
  if (Array.isArray(node)) {
    node.forEach((item) => { collectFieldTypes(item, fieldTypeMap, context) })
    return
  }

  if (!isRecord(node)) {
    return
  }

  const meta = getNodeMeta(node)
  const nextContext = { ...context }

  if (isTopLevelDataField(meta, context)) {
    fieldTypeMap.set(meta.name, meta.fieldType)
    nextContext.currentTopLevelDataName = meta.name
  }

  Object.values(node).forEach((value) => {
    collectFieldTypes(value, fieldTypeMap, nextContext)
  })
}

export const buildFieldTypeMap = (layout: unknown): Map<string, string> => {
  const fieldTypeMap = new Map<string, string>()
  collectFieldTypes(layout, fieldTypeMap)
  return fieldTypeMap
}
