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

import React, { useEffect, useState } from 'react'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Checkbox } from 'antd'

export const CheckboxCell = (props: DefaultCellProps): React.JSX.Element => {
  const [boolean, setBoolean] = useState<boolean>(Boolean(props.getValue()))

  useEffect(() => {
    setBoolean(Boolean(props.getValue()))
  }, [props.getValue()])

  return (
    <Checkbox
      checked={ boolean }
      key={ props.row.id }
      onChange={ (e) => {
        setBoolean(Boolean(e.target.checked))
      } }
    />
  )
}
