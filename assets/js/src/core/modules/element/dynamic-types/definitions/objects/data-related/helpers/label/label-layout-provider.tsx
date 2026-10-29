/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { type FormItemProps } from 'antd'

export interface LabelLayout {
  labelWidth?: number | null
  labelAlign?: string | null
}

export type LabelLayoutItemProps = Pick<FormItemProps, 'labelAlign' | 'labelCol' | 'layout'>

// `null` rather than an empty object, so a field outside any configured
// container is distinguishable from one inside a container that configured
// nothing — only the former may keep antd's own defaults untouched.
const LabelLayoutContext = createContext<LabelLayout | null>(null)

export interface LabelLayoutProviderProps extends LabelLayout {
  children: ReactNode
}

export const LabelLayoutProvider = ({ children, labelAlign, labelWidth }: LabelLayoutProviderProps): React.JSX.Element => {
  const value = useMemo(() => ({ labelAlign, labelWidth }), [labelAlign, labelWidth])

  return (
    <LabelLayoutContext.Provider value={ value }>
      { children }
    </LabelLayoutContext.Provider>
  )
}

export const useLabelLayout = (): LabelLayout | null => useContext(LabelLayoutContext)

/**
 * The legacy container settings translated into antd `Form.Item` props.
 *
 * Kept as a pure function rather than inlined at the consumer so the mapping
 * is testable on its own — the same reason `toCssDimension` is one.
 */
export const labelLayoutItemProps = (layout: LabelLayout | null): LabelLayoutItemProps => {
  if (layout === null || layout === undefined) {
    return {}
  }

  // 'top' is not an antd alignment. It puts the label on its own row above the
  // control, which antd expresses as a vertical item layout, and a fixed label
  // column stops meaning anything once that happens — so the width is dropped
  // rather than silently fighting the layout.
  if (layout.labelAlign === 'top') {
    return { layout: 'vertical' }
  }

  const props: LabelLayoutItemProps = {}

  if (layout.labelAlign === 'left') {
    props.labelAlign = 'left'
  }

  // An untouched class definition sends 0 or null, which legacy ExtJS treated as
  // unset; emitting nothing keeps antd's own label column.
  if (typeof layout.labelWidth === 'number' && layout.labelWidth > 0) {
    props.labelCol = { flex: `0 0 ${layout.labelWidth}px` }
  }

  return props
}
