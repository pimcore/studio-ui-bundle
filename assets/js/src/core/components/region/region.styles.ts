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
