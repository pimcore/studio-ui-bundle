/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import React, { type ReactNode } from 'react'

interface FlexContainerProps {
  renderElements: ReactNode[]
}

const FlexContainerView = (props: FlexContainerProps): React.JSX.Element => {
  return (
    <Flex
      gap={ 'extra-small' }
      wrap
    >
      {props.renderElements}
    </Flex>
  )
}

export { FlexContainerView }
