/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Flex } from 'antd'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { LoadingOutlined } from '@ant-design/icons'

export const renderFullPathCell = (info: any): React.JSX.Element => {
  return (
    <Flex
      align={ 'center' }
      className={ 'p-mini' }
    >
      <SanitizeHtml html={ info.getValue() ?? '' } />
      {info.row.original.loading !== false ? (<LoadingOutlined style={ { marginLeft: 8 } } />) : null}
    </Flex>
  )
}
