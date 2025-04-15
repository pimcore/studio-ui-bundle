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

import { type SelectedColumn } from '../../abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AbstractDecoratorWithRequiredConfig } from '../abstract-decorator'
import { WithInlineEdit } from './view-layer/components/grid/hooks/use-grid-options/with-inline-edit-options'

export interface UpdateEvent {
  getGetRequestArgs: any
  update: {
    id: number
    column: SelectedColumn
    value: any
  }
  meta?: Record<string, any>
}

export interface UseInlineEditApiUpdateReturn {
  updateCache: (event: UpdateEvent) => void
  updateApiData: (event: UpdateEvent) => Promise<any>
}

export interface IInlineEditDecoratorConfig {
  useInlineEditApiUpdate: () => UseInlineEditApiUpdateReturn
}

export type IInlineEditDecorator = AbstractDecoratorWithRequiredConfig<IInlineEditDecoratorConfig>

export type IInlineEditDecoratorProps = Parameters<IInlineEditDecorator>[0]

export const InlineEditDecorator: IInlineEditDecorator = (props, config) => {
  const { useGridOptions, ...baseProps } = props

  const newProps = {
    ...baseProps,
    useGridOptions: WithInlineEdit(useGridOptions, config)
  }

  return newProps
}
