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

import React, { useMemo } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from 'antd'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'

export const DataObjectActionsCell = ({ row }: DefaultCellProps): React.JSX.Element => {
  const data = row.original
  const { openDataObject } = useDataObjectHelper()

  return useMemo(() => (
    <div className={ 'default-cell__content' }>
      <Flex
        className='w-full'
        justify='center'
      >
        <IconButton
          icon={ { value: 'open-folder' } }
          onClick={ () => { openDataObject({ config: { id: data.id } }) } }
          type='link'
        />
      </Flex>
    </div>
  ), [data.id])
}
