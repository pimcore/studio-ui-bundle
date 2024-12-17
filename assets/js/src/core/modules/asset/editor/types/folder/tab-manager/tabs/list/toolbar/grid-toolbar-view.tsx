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

import React, { type ReactNode } from 'react'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Split } from '@Pimcore/components/split/split'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export interface GridToolbarViewProps {
  renderPagination?: ReactNode
  renderTools?: ReactNode
  onRefresh?: () => void
}

const GridToolbarView = (props: GridToolbarViewProps): React.JSX.Element => {
  return (
    <Toolbar theme='secondary'>
      {props.renderTools !== undefined && (
        <>{props.renderTools}</>
      )}

      {props.renderTools === undefined && (
        <div />
      )}

      <Split dividerSize='small'>
        <IconButton
          icon={ { value: 'refresh' } }
          onClick={ props.onRefresh }
        />

        {props.renderPagination !== undefined && (
          <>{props.renderPagination}</>
        )}
      </Split>
    </Toolbar>
  )
}

export { GridToolbarView }
