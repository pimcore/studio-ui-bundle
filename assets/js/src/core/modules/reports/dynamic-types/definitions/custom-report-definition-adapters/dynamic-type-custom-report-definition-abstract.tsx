/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement, type ReactNode } from 'react'
import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { type ICustomReportDashboardViewProps, type ICustomReportViewProps } from '@Pimcore/modules/reports/reports-view/types'

@injectable()
export abstract class DynamicTypeCustomReportDefinitionAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getLabel (): ReactElement
  abstract getPagination (): boolean
  abstract getCustomReportData ({ currentData, updateFormData, form }: IReportConfigurationSectionProps): ReactElement

  /**
   * Replaces the generic column configuration and chart settings sections of the report editor.
   * Return null to keep the generic sections.
   * Called during render: return an element such as <MyEditor { ...props } /> and do not call hooks here.
   */
  getCustomReportEditor (props: IReportConfigurationSectionProps): ReactElement | null {
    return null
  }

  /**
   * Replaces the generic report view (grid, chart and sidebar) below the report selection.
   * Overriding this method means the adapter loads the report data itself: the generic chart request is
   * not sent and reportData.chartDetailData stays undefined. An override must always return an element
   * (null renders nothing); the default (null) keeps the generic view.
   * Called during render: return an element such as <MyView { ...props } /> and do not call hooks here.
   */
  getCustomReportView (props: ICustomReportViewProps): ReactElement | null {
    return null
  }

  /**
   * Return true when the adapter renders its own content for the custom report dashboard widget.
   * Default false: the widget keeps its standard rendering.
   */
  providesCustomReportDashboardView (): boolean {
    return false
  }

  /**
   * Content of the custom report dashboard widget, used when providesCustomReportDashboardView returns true.
   * The adapter loads its own data for the given report. Default: null (standard rendering).
   * Called during render: return an element such as <MyTile { ...props } /> and do not call hooks here.
   */
  getCustomReportDashboardView (props: ICustomReportDashboardViewProps): ReactNode {
    return null
  }
}
