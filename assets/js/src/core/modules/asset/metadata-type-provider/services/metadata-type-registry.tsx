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

import { injectable } from 'inversify'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

export interface AssetMetadataTypeInterface {
  visibleInTypeSelection: boolean
  formatVersionPreview: (data: any) => JSX.Element
  getGridCell: (props: DefaultCellProps) => JSX.Element
}

@injectable()
export class MetadataTypeRegistry {
  private readonly components = new Map<string, AssetMetadataTypeInterface>()

  registerComponent (type: string, component: AssetMetadataTypeInterface): void {
    this.components.set(type, component)
  }

  getComponentByType (type: string): AssetMetadataTypeInterface | undefined {
    return this.components.get(type)
  }

  getTypeSelectionTypes (): Map<string, AssetMetadataTypeInterface> {
    const visibleComponents = new Map<string, AssetMetadataTypeInterface>()
    this.components.forEach((component, type) => {
      if (component.visibleInTypeSelection) {
        visibleComponents.set(type, component)
      }
    })
    return visibleComponents
  }
}
