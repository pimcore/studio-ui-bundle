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

import React from 'react'
import i18n from '@Pimcore/app/i18n'
import { useStyles } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/versions-view.style'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { Grid } from '@Pimcore/components/grid/grid'

export const VersionsView = (): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ styles.versions }>
      <div className={ 'left-side' }>
        <div>
          <span>{i18n.t('versions')}</span>
          <Button>{i18n.t('compare-versions')}</Button>
          <Button icon={ <Icon name={ 'delete-outlined' } /> }>{i18n.t('clear-all')}</Button>
        </div>
      </div>
      <div className={ 'right-side' }>
        {/*<Grid*/}
        {/*  columns={ }*/}
        {/*  data={ }*/}
        {/*/>*/}
      </div>
    </div>
  )
}
