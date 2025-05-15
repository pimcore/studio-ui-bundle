/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'
import { type RegionProps } from './region'
import { cssContainerWidget } from '@Pimcore/modules/widget-manager/widget/widget-view'

export const useStyles = createStyles(({ token, css }, { layoutDefinition, items }: RegionProps) => {
  const gridTemplateAreas = layoutDefinition.map((row) => `"${row}"`).join(' ')
  const maxWidthsPerRegion = items.map((item) => {
    return { region: item.region, maxWidth: item.maxWidth }
  })

  const maxWidthsPerColumn: string[][] = []

  layoutDefinition.forEach((row) => {
    const regions = row.split(' ')
    regions.forEach((region, index) => {
      const maxWidth = maxWidthsPerRegion.find((item) => item.region === region)?.maxWidth

      if (!Array.isArray(maxWidthsPerColumn[index])) {
        maxWidthsPerColumn[index] = []
      }

      const maxWidthAsNumber = Number(maxWidth ?? '0')
      const isValidNumber = !isNaN(maxWidthAsNumber)

      if (maxWidth !== undefined && ((maxWidth !== '' && maxWidth !== '0' && !isValidNumber) || (isValidNumber && maxWidthAsNumber > 0))) {
        if (isValidNumber) {
          maxWidthsPerColumn[index].push(`${maxWidthAsNumber}px`)
        } else {
          maxWidthsPerColumn[index].push(maxWidth)
        }
      }
    })
  })

  const gridTemplateColumns = maxWidthsPerColumn.map((column) => {
    if (column.length === 0) {
      return '1fr'
    }

    return `max(${column.join(',')})`
  }).join(' ')

  return {
    region: css`
      display: flex;
      flex-direction: column;
      // @todo make this configurable
      gap: 12px;

      // @todo we should introduce a predefined set of breakpoints
      @container ${cssContainerWidget.name} (min-width: 768px) {
        display: grid;
        grid-template-areas: ${gridTemplateAreas};
        grid-template-columns: ${gridTemplateColumns};
      }
    `
  }
})
