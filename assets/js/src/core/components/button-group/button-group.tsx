/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { Flex, Button } from 'antd'
import { useStyles } from './button-group.styles'

export interface ButtonGroupProps {
  items: ReactElement[]
  withSeparator?: boolean
  noSpacing?: boolean
}

export const ButtonGroup = ({ items, noSpacing = false, withSeparator = false }: ButtonGroupProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classnames = [styles.buttonGroup, 'button-group']

  if (withSeparator) {
    classnames.push('button-group--with-separator')
  }

  return (
    <>
      {!noSpacing && (
        <Flex
          align='center'
          className={ classnames.join(' ') }
          gap={ 'small' }
        >
          {items.map((item, index) => (
            <div
              className="button-group__item"
              key={ index }
            >
              {item}
            </div>
          ))}
        </Flex>
      )}

      {noSpacing && (
        <Button.Group>
          {items.map((item, index) => (
            <span key={ index }>{item}</span>
          ))}
        </Button.Group>
      )}
    </>
  )
}
