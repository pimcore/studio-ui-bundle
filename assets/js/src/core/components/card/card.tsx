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

import React, { Fragment, type RefObject } from 'react'
import { Card as AntdCard, type CardProps as AntdCardProps } from 'antd'
import { useStyles } from '@Pimcore/components/card/card.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { PimcoreImage as Image } from '@Pimcore/components/pimcore-image/pimcore-image'
import { useTranslation } from 'react-i18next'
import { Box, type BoxProps } from '../box/box'
import { Flex, type FlexProps } from '../flex/flex'

export interface CardProps extends AntdCardProps {
  loading?: boolean
  fitContent?: boolean
  onClose?: () => void
  icon?: string
  image?: { src: string, alt?: string } | null
  footer?: React.ReactNode
  theme?: 'default' | 'fieldset' | 'card-with-highlight'
  contentPadding?: BoxProps['padding']
  extraPosition?: FlexProps['justify']
}

const Component = ({ loading, children, footer, fitContent, className, theme = 'default', contentPadding = 'small', ...props }: CardProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const classNames = [
    styles.card,
    className,
    footer !== undefined ? 'card-with-footer' : '',
    fitContent === true ? 'card-fit-content' : '',
    `card--theme-${theme}`
  ].filter(Boolean)

  const renderExtraContent = (): React.ReactElement | null => {
    return (
      <Flex
        className='w-full'
        justify={ props.extraPosition ?? 'flex-end' }
      >
        {Array.isArray(props.extra)
          ? (
            <div>
              {props.extra.map((extra, index) => (
                typeof extra === 'object' && extra.icon !== undefined
                  ? (
                    <IconButton
                      icon={ { value: extra.icon as string } }
                      key={ `${extra.icon}-${index}` }
                      onClick={ extra.onClick }
                      role={ 'button' }
                      title={ extra.title }
                      type={ extra.type !== undefined ? extra.type : 'text' }
                    />
                    )
                  : (<Fragment key={ `${extra.icon}-${index}` }>{extra}</Fragment>)
              ))}
            </div>
            )
          : props.extra}

        {props.onClose !== undefined
          ? (
            <IconButton
              aria-label={ t('aria.card.close') }
              icon={ { value: 'close' } }
              onClick={ () => props.onClose?.() }
              role={ 'button' }
              size="small"
              type={ 'text' }
            />
            )
          : null}
      </Flex>
    )
  }

  const renderTitle = (): React.ReactElement => {
    return (
      <>
        {props.icon !== undefined && props.icon !== null ? <Icon value={ props.icon } /> : null}
        {props.title}
      </>
    )
  }

  return (
    <AntdCard
      { ...props }
      actions={ props.actions }
      className={ classNames.join(' ') }
      cover={ props.image !== null && props.image?.src !== undefined
        ? (
          <Image
            alt={ props.image.alt }
            src={ props.image.src }
          />
          )
        : props.cover }
      extra={ props.extra !== undefined && props.extra !== null ? renderExtraContent() : null }
      title={ props.title !== undefined && props.title !== null ? renderTitle() : null }
    >
      {children !== undefined && (
      <Box padding={ contentPadding }>
        {children}
      </Box>
      )}

      {footer !== undefined && (
      <div className="card-footer">
        {footer}
      </div>
      )}

    </AntdCard>
  )
}

export const Card = React.forwardRef(Component)
