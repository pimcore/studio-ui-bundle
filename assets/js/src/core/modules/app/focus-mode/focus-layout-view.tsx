/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { useAppSelector } from '@sdk/app'
import { Button } from '@Pimcore/components/button/button'
import { WidgetManagerInnerContainer } from '@Pimcore/modules/widget-manager/widget-manager-inner-container'
import { selectInnerModel } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useWidgetTitle } from '@Pimcore/modules/widget-manager/hooks/use-widget-title'
import { getFullStudioUrl } from './focus-mode'
import { useStyles } from './focus-layout-view.styles'

const FocusTitle = ({ node }: { node: TabNode }): React.JSX.Element => {
  const { title } = useWidgetTitle(node)

  return <span className='focus-layout__title'>{title}</span>
}

// The tab a deep link opened, full width: no trees, sidebars or other tabs.
export const FocusLayoutView = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const innerModel = useAppSelector(selectInnerModel)

  const node = useMemo((): TabNode | undefined => {
    const model = Model.fromJson(innerModel)
    const tabset = model.getActiveTabset() ?? model.getNodeById('main_tabset') as TabSetNode | undefined

    return tabset?.getSelectedNode() as TabNode | undefined
  }, [innerModel])

  return (
    <div className={ ['focus-layout', styles.focusLayout].join(' ') }>
      <header className={ ['focus-layout__header', styles.header].join(' ') }>
        {node !== undefined && <FocusTitle node={ node } />}
        <Button
          href={ getFullStudioUrl() }
          type='default'
        >
          {t('focus-view.open-in-studio')}
        </Button>
      </header>

      <main
        className='focus-layout__content'
        id="main-content"
        tabIndex={ -1 }
      >
        {node === undefined
          ? <p className={ styles.empty }>{t('focus-view.nothing-to-show')}</p>
          : <WidgetManagerInnerContainer />}
      </main>
    </div>
  )
}
