/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo } from 'react'
import { Form } from '../../form'

export interface NumberedListIteratorItemProps {
  itemKey: string
  children: React.ReactNode
}

const NumberedListIteratorItem = ({ itemKey, children }: NumberedListIteratorItemProps): React.JSX.Element => {
  return (
    <Form.Group
      key={ itemKey }
      name={ itemKey }
    >
      {children}
    </Form.Group>
  )
}

export default memo(NumberedListIteratorItem)
